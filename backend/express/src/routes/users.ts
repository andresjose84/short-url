import { Router } from 'express';
import { createUser, deleteUser, listUsers, updateUser } from '../controllers/users.controllers';
import { validateJWT } from '../middlewares/jwt-validations';
import { isAdmin } from '../middlewares/user';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users or a specific user
 *     description: Retrieve a list of all users or a specific user by ID.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */
router.get('/', validateJWT, listUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user. Only admins can perform this action.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access. Only admins can create users.
 */
router.post('/', validateJWT, isAdmin, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's information.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User's unique identifier
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized access
 */
router.put('/:id', validateJWT, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user. Only admins can perform this action.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User's unique identifier
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access. Only admins can delete users.
 */
router.delete('/:id', validateJWT, isAdmin, deleteUser);

export default router;