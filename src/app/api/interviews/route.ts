import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { sendMail } from "@/services/email";
import { notifyUser } from "@/services/realtime";
import { Application } from "@/models/Application";
import { InterviewSchedule } from "@/models/InterviewSchedule";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "HR") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await connectDB();
  const { applicationId, startsAt, meetingUrl } = await request.json();
  const application = await Application.findById(applicationId).populate("seekerId");
  if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });

  const interview = await InterviewSchedule.create({
    applicationId,
    interviewerId: session.user.id,
    startsAt,
    meetingUrl
  });

  await Application.findByIdAndUpdate(applicationId, { stage: "INTERVIEWING" });
  await notifyUser({
    userId: application.seekerId._id.toString(),
    type: "INTERVIEW",
    title: "Interview scheduled",
    body: `Your interview is scheduled for ${new Date(startsAt).toLocaleString()}.`,
    href: "/applied-jobs"
  });

  if (application.seekerId.email) {
    await sendMail({
      to: application.seekerId.email,
      subject: "CareerDock interview invitation",
      html: `<p>Your interview is scheduled for ${new Date(startsAt).toLocaleString()}.</p><p>${meetingUrl ?? ""}</p>`
    });
  }

  return NextResponse.json({ interview }, { status: 201 });
}
