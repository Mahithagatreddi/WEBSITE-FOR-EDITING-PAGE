import mongoose, { Schema, Document } from "mongoose";

// Event Model
export interface IEvent extends Document {
  title: string;
  date: Date;
  details: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String, required: true },
}, { timestamps: true });

export const EventModel = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

// Reel Model
export interface IReel extends Document {
  title: string;
  category: string;
  videoUrl: string;
  views: number;
  reach: number;
  location?: string;
}

const ReelSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  videoUrl: { type: String, required: true },
  views: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  location: { type: String, required: false },
}, { timestamps: true });

export const ReelModel = mongoose.models.Reel || mongoose.model<IReel>("Reel", ReelSchema);

// Enquiry Model
export interface IEnquiry extends Document {
  name: string;
  phone: string;
  category: string;
  plan: string;
}

const EnquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  plan: { type: String, required: true },
}, { timestamps: true });

export const EnquiryModel = mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
