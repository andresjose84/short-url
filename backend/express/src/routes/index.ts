import { Router } from 'express';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerOutput from "../swagger_output.json";

import redirectsRoutes from './redirects';
import shortUrlRoutes from './short-url';
import userRoutes from './users';
import loginRoutes from './login';
import seedsRoutes from './seeds';

const router = Router();


router.use( '/api/v1.0/docs', swaggerUi.serve, swaggerUi.setup( swaggerOutput ) );

/**
 * @swagger
 * tags:
 *   - name: Redirects
 *     description: Rutas para manejar redirecciones de URLs cortas
 *   - name: Short URL
 *     description: Rutas para crear, obtener, actualizar y eliminar URLs cortas
 *   - name: Users
 *     description: Rutas para manejar usuarios
 *   - name: Login
 *     description: Rutas para autenticación y validación de usuarios
 *   - name: Seeds
 *     description: Rutas para semillas y pruebas
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirige al usuario a la URL original asociada con la URL corta proporcionada.
 *     responses:
 *       302:
 *         description: Redirección exitosa a la URL original.
 *       404:
 *         description: No se encontró la URL corta.
 */
router.use( "/", redirectsRoutes );

/**
 * @swagger
 * /api/v1.0/shorturl:
 *   get:
 *     summary: Get short URL
 *     description: Obtiene las URLs cortas disponibles.
 *     responses:
 *       200:
 *         description: Lista de URLs cortas.
 *       403:
 *         description: Acceso denegado.
 */
router.use( '/api/v1.0/shorturl', shortUrlRoutes );

/**
 * @swagger
 * /api/v1.0/users:
 *   get:
 *     summary: Get user list
 *     description: Obtiene una lista de usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *       403:
 *         description: Acceso denegado.
 */
router.use( '/api/v1.0/users', userRoutes );

/**
 * @swagger
 * /api/v1.0/login:
 *   post:
 *     summary: User login
 *     description: Permite a los usuarios autenticarse.
 *     responses:
 *       200:
 *         description: Autenticación exitosa.
 *       401:
 *         description: Credenciales incorrectas.
 */
router.use( '/api/v1.0/login', loginRoutes );

/**
 * @swagger
 * /api/v1.0/seed:
 *   get:
 *     summary: Seed the database
 *     description: Semilla para poblar la base de datos con datos iniciales.
 *     responses:
 *       200:
 *         description: Base de datos sembrada correctamente.
 *       500:
 *         description: Error al sembrar los datos.
 */
router.use( '/api/v1.0/seed', seedsRoutes );

export default router;
