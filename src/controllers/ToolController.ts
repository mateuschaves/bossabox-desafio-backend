
import {Request, Response} from 'express';

import { Tool } from '../models';

import { isValidObjectId } from 'mongoose';

class ToolController {
    async store(request: Request, response: Response) {
        try {
            const { title, link, description, tags } = request.body;
            if(!title || !link || !description || !tags)
                return response.status(400).json({
                    error: true,
                    message: 'fill all required fields'
                });
            const tool = await Tool.create({
                title,
                link,
                description,
                tags
            });
            return response.status(201).json(tool);
        } catch (error) {
            return response.status(400).json(error);
        }
    }


    async index(request: Request, response: Response) {
        try {
            const tag: string = request.query.tag as string;
            if(tag){
                const tools = await Tool.find({
                    tags: tag
                }) || [];
                return response.status(200).json(tools);
            }else {
                const tools = await Tool.find() || [];
                return response.status(200).json(tools);
            }
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async destroy(request: Request, response: Response) {
        try {
            const { id = 1 } = request.params;
            if(isValidObjectId(id)){
                const tool = await Tool.findById(id);
                if(tool){
                    await tool.remove();
                    return response.status(204).json();
                }else {
                    return response.status(400).json({
                        error: true,
                        message: 'tool not found'
                    });
                }
            }else {
                return response.status(400).json({
                    error: true,
                    message: 'invalid id'
                });
            }
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}

export default new ToolController();
