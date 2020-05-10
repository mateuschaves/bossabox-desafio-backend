import { Router } from 'express';

import { RepositoryController } from './controllers';
  
class Routes {

    routes: Router;

    constructor() {
        this.routes = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.routes.post('/repository', RepositoryController.store);
    }
}
 
  
  export default new Routes().routes;