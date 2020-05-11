import { Router } from 'express';

import { ToolController } from './controllers';
  
class Routes {

    routes: Router;

    constructor() {
        this.routes = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.routes.post('/tools', ToolController.store);
        this.routes.get('/tools', ToolController.index);
    }
}
 
  
  export default new Routes().routes;