import { Router } from 'express';
import { validateJWT } from '../middlewares/jwt-validations';
import { createShortUrl, deleteShortUrl, getShortUrl, updateShortUrl } from '../controllers/shorturl.controllers';

const router = Router();

/**
 * @swagger
 * /api/v1.0/shorturl:
 *   get:
 *     summary: Get all short URLs
 *     description: Retrieve a list of all short URLs associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of short URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   shortId:
 *                     type: string
 *                   originalUrl:
 *                     type: string
 *                   shortUrl:
 *                     type: string
 *       401:
 *         description: Unauthorized. Invalid or missing token
 */
router.get( '/', validateJWT, getShortUrl );

/**
 * @swagger
 * /api/v1.0/shorturl/{shortId}:
 *   get:
 *     summary: Get a specific short URL
 *     description: Retrieve a specific short URL by its ID.
 *     parameters:
 *       - name: shortId
 *         in: path
 *         required: true
 *         description: The short URL's ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The short URL associated with the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortId:
 *                   type: string
 *                 originalUrl:
 *                   type: string
 *                 shortUrl:
 *                   type: string
 *       404:
 *         description: Short URL not found
 *       401:
 *         description: Unauthorized. Invalid or missing token
 */
router.get( '/:shortId', validateJWT, getShortUrl );

/**
 * @swagger
 * /api/v1.0/shorturl:
 *   post:
 *     summary: Create a new short URL
 *     description: Create a new short URL for a given original URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Short URL successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortId:
 *                   type: string
 *                 originalUrl:
 *                   type: string
 *                 shortUrl:
 *                   type: string
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized. Invalid or missing token
 */
router.post( '/', validateJWT, createShortUrl );

/**
 * @swagger
 * /api/v1.0/shorturl/{shortId}:
 *   put:
 *     summary: Update a short URL
 *     description: Update the original URL associated with a short URL.
 *     parameters:
 *       - name: shortId
 *         in: path
 *         required: true
 *         description: The short URL's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Short URL updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortId:
 *                   type: string
 *                 originalUrl:
 *                   type: string
 *                 shortUrl:
 *                   type: string
 *       404:
 *         description: Short URL not found
 *       401:
 *         description: Unauthorized. Invalid or missing token
 */
router.put( '/:shortId', validateJWT, updateShortUrl );

/**
 * @swagger
 * /api/v1.0/shorturl/{shortId}:
 *   delete:
 *     summary: Delete a short URL
 *     description: Delete a specific short URL by its ID.
 *     parameters:
 *       - name: shortId
 *         in: path
 *         required: true
 *         description: The short URL's ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Short URL deleted successfully
 *       404:
 *         description: Short URL not found
 *       401:
 *         description: Unauthorized. Invalid or missing token
 */
router.delete( '/:shortId', validateJWT, deleteShortUrl );

export default router;
