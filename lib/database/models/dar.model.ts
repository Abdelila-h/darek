import { Document, Schema, model, models } from "mongoose";

export interface IDar extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  freeDateTime: Date;
  freebisDateTime: Date;
  price: string;
  url?: string;
  category: { _id: string, name: string }
  owner: { _id: string, firstName: string, lastName: string }
}

const DarSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  freeDateTime: { type: Date, default: Date.now },
  freebisDateTime: { type: Date, default: Date.now },
  price: { type: String },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Dar = models.Dar || model('Dar', DarSchema);

export default Dar;