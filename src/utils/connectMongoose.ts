import * as mongoose from 'mongoose';
import config from '../config';

export default function(callback) {
  (mongoose as any).Promise = global.Promise;
  mongoose.connect(config.db, callback);
}
