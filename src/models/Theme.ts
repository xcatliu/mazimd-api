import { Document, model, Schema } from 'mongoose';

interface ITheme extends Document {
  id: string;
  name: string;
  css: string;
  created_at: Date;
}

const ThemeSchema = new Schema({
  id: String,
  name: String,
  css: String,
  created_at: Date,
});

export default model<ITheme>('Theme', ThemeSchema);
