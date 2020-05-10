import { Router } from 'express';
  
class Routes {

    routes: Router;

    constructor() {
        this.routes = Router();
    }

    initializeRoutes() {
    }
}
 
  
  export default new Routes().routes;