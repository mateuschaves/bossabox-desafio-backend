import { Router } from 'express';
  
class Routes {

    routes: Router;

    constructor() {
        this.routes = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
    }
}
 
  
  export default new Routes().routes;