import { Document, Schema, model, models } from "mongoose";
import mongoose from "mongoose";

export interface IDar extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  imageUrl: string;
  price: string;
  url?: string;
  category: { _id: string, name: string }
  user: { _id: string, firstName: string, lastName: string, clerkId: string }
}

const DarSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  imageUrl: { type: String },
  price: { type: String },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', set: (v: string) => new mongoose.Types.ObjectId(v)},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Dar = models.Dar || model('Dar', DarSchema);

export default Dar;