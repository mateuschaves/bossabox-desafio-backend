
import { Schema, model } from 'mongoose';

import { ITool } from '../interfaces'

const ToolSchema = new Schema({
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

export default model<ITool>("Tool", ToolSchema);
