import { Document } from 'mongoose';

export default interface IRepository  extends Document {
    title: string;
    link: string;
    description: string;
    tags: string[];
    createdAt?: Date,
    updatedAt?: Date
  }