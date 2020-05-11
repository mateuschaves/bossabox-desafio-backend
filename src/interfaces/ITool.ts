import { Document } from 'mongoose';

export default interface ITool  extends Document {
    title: string;
    link: string;
    description: string;
    tags: string[];
    createdAt?: Date,
    updatedAt?: Date
  }