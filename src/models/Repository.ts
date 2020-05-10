
import { Schema, model } from 'mongoose';

import { IRepository } from '../interfaces'

const RepositorySchema = new Schema({
    title: String,
    link: String,
    description: String,
    tags: Array,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export default model<IRepository>("Repository", RepositorySchema);
