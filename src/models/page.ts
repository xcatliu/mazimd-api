import * as md5 from 'md5';
import { Document, model, Schema } from 'mongoose';

interface IPage extends Document {
  id: string;
  content: string;
  contentToMd5: () => string;
}

const PageSchema = new Schema({
  id: String,
  content: String,
});

PageSchema.methods.contentToMd5 = function contentToMd5() {
  return md5(this.content);
};

export default model<IPage>('Page', PageSchema);
