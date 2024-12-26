import { Router } from 'express';
import { loadData } from '../controllers/seed.controllers';

const router = Router();

router.get( '/', loadData );

export default router;