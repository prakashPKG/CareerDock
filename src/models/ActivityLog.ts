import { model, models, Schema } from "mongoose";

const activityLogSchema = new Schema(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    action: { type: String, required: true, index: true },
    entity: String,
    entityId: Schema.Types.ObjectId,
    metadata: Schema.Types.Mixed,
    ip: String
  },
  { timestamps: true }
);

activityLogSchema.index({ createdAt: -1 });

export const ActivityLog = models.ActivityLog || model("ActivityLog", activityLogSchema);
