
import express, { Express } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { connection } from "./middlewares/conex";
import routes from './routes';

dotenv.config();

//console.log( process.env );

const app: Express = express();
const port = process.env.PORT || 3000;
const urlencodeparser = bodyParser.urlencoded( { extended: false } );
const jsonParser = bodyParser.json();

//CORS
app.use( cors() );

//Public folder
app.use( express.static( path.join( __dirname, 'public' ) ) );

//Body parser 
app.use( express.json() );
app.use( urlencodeparser );
// app.use( jsonParser );

//Database connection

app.use( connection );

//Routes:
app.use( "/", routes );

app.listen( port, () => console.log( `Shorter url app listening on port ${ port }!` ) );