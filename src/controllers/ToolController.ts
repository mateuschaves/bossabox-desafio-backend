
import {Request, Response} from 'express';

import { Tool } from '../models';

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
                const repositories = await Tool.find({
                    tags: tag
                }) || [];
                return response.status(200).json(repositories);
            }else {
                const repositories = await Tool.find() || [];
                return response.status(200).json(repositories);
            }
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}

export default new ToolController();
