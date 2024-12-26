import { Router } from 'express';
import { validateJWT, isValidToken } from '../middlewares/jwt-validations';
import { validateToken } from '../controllers/token.controllers';
import { loginUser } from '../controllers/users.controllers';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticate a user and return a token.
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Token to validate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Login successful. Returns user data and token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized. Invalid token or missing credentials
 */
router.post( '/', isValidToken, loginUser );

/**
 * @swagger
 * /login/validate-token:
 *   get:
 *     summary: Validate the JWT token
 *     description: Validate a JWT token to check if it's valid.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token validated successfully
 *       401:
 *         description: Unauthorized access. Invalid token
 */
router.get( '/validate-token', validateJWT, validateToken );

export default router;
