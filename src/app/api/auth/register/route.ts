import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { rateLimit, sanitizeText } from "@/lib/security";
import { signupSchema } from "@/lib/validators";
import { sendMail } from "@/services/email";
import { User } from "@/models/User";
import { ActivityLog } from "@/models/ActivityLog";

export async function POST(request: Request) {
  const limited = rateLimit(request.headers.get("x-forwarded-for") ?? "register", 10);
  if (limited) return limited;

  const body = await request.json();
  const parsed = signupSchema.parse({
    ...body,
    firstName: sanitizeText(body.firstName),
    lastName: sanitizeText(body.lastName),
    email: sanitizeText(body.email).toLowerCase()
  });

  await connectDB();
  const exists = await User.exists({ email: parsed.email });
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const passwordHash = await bcrypt.hash(parsed.password, 12);
  const user = await User.create({
    ...parsed,
    socials: {
      linkedin: parsed.linkedin,
      github: parsed.github,
      portfolio: parsed.portfolio
    },
    passwordHash,
    activeAt: new Date()
  });
  await ActivityLog.create({ actorId: user._id, action: "USER_REGISTERED", entity: "User", entityId: user._id });
  await sendMail({
    to: user.email,
    subject: "Verify your CareerDock account",
    html: `<p>Welcome to CareerDock, ${user.firstName}. Your account is ready for verification.</p>`
  });

  return NextResponse.json({ user: { id: user._id, email: user.email, role: user.role } }, { status: 201 });
}
