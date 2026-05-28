import { model, models, Schema } from "mongoose";

const companySchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    website: String,
    logoUrl: String,
    industry: String,
    size: String,
    location: String,
    hrUsers: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export const Company = models.Company || model("Company", companySchema);
