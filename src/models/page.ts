import { Document, model, Schema } from 'mongoose';

interface IPage extends Document {
  id: string;
  content: string;
  created_at: Date;
  expire_in: string;
}

const PageSchema = new Schema({
  id: String,
  content: String,
  created_at: Date,
  expire_in: String,
});

export default model<IPage>('Page', PageSchema);
