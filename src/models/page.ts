import { Document, model, Schema } from 'mongoose';

interface IPage extends Document {
  id: string;
  content: string;
}

const PageSchema = new Schema({
  id: String,
  content: String,
});

export default model<IPage>('Page', PageSchema);
