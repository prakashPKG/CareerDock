import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Application } from "@/models/Application";
import { sendMail } from "@/services/email";
import { notifyUser } from "@/services/realtime";

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "HR") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const { applicationId, stage } = await request.json();
  const application = await Application.findByIdAndUpdate(applicationId, { stage }, { new: true }).populate("seekerId");
  if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  await notifyUser({
    userId: application.seekerId._id.toString(),
    type: "ATS_UPDATE",
    title: "Application status updated",
    body: `Your application moved to ${stage}.`,
    href: "/applied-jobs"
  });
  if (application.seekerId.email) {
    await sendMail({
      to: application.seekerId.email,
      subject: "CareerDock application update",
      html: `<p>Your application moved to <strong>${stage}</strong>.</p>`
    });
  }
  return NextResponse.json({ application });
}
