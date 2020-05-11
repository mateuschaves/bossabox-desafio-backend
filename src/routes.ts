import { Router } from 'express';

import { RepositoryController } from './controllers';
  
class Routes {

    routes: Router;

    constructor() {
        this.routes = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.routes.post('/tools', RepositoryController.store);
        this.routes.get('/tools', RepositoryController.index);
    }
}
 
  
  export default new Routes().routes;