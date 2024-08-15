import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const routesPath = `${path.join(__dirname)}\\app`;

fs.readdirSync(routesPath).forEach(file => {
  const route = path.join(routesPath, file, "routes.ts");
  const routers = require(route).router
  if (routers) {
    router.use(`/${file}`, routers);
  }

});

export default router;
