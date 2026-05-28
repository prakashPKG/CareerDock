import { model, models, Schema } from "mongoose";

const interviewScheduleSchema = new Schema(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: "Application", required: true, index: true },
    interviewerId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    startsAt: { type: Date, required: true, index: true },
    durationMinutes: { type: Number, default: 45 },
    meetingUrl: String,
    status: { type: String, enum: ["SCHEDULED", "COMPLETED", "CANCELLED"], default: "SCHEDULED" }
  },
  { timestamps: true }
);

export const InterviewSchedule = models.InterviewSchedule || model("InterviewSchedule", interviewScheduleSchema);
