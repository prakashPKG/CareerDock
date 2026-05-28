import { model, models, Schema } from "mongoose";

const socialSchema = new Schema(
  {
    linkedin: String,
    github: String,
    portfolio: String
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ["ADMIN", "SEEKER", "HR"], default: "SEEKER", index: true },
    dob: Date,
    gender: String,
    phone: String,
    country: String,
    city: String,
    education: String,
    experience: String,
    skills: [{ type: String, index: true }],
    resumeId: { type: Schema.Types.ObjectId, ref: "Resume" },
    companyId: { type: Schema.Types.ObjectId, ref: "Company" },
    socials: socialSchema,
    emailVerified: { type: Boolean, default: false },
    activeAt: Date
  },
  { timestamps: true }
);

userSchema.index({ role: 1, activeAt: -1 });

export const User = models.User || model("User", userSchema);
