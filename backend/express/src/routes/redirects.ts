import { Router } from 'express';
import { getUrlShorter } from '../controllers/redirect.controllers';

const router = Router();

/**
 * @swagger
 * /{shorturi}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirects the user to the original URL associated with the provided short URL identifier.
 *     parameters:
 *       - name: shorturi
 *         in: path
 *         required: true
 *         description: The short URL identifier
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Successfully redirected to the original URL
 *       404:
 *         description: Short URL not found
 */
router.get( '/:shorturi', getUrlShorter );

export default router;
