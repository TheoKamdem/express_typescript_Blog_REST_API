import express from 'express';
import dotenv from 'dotenv';
import  connectDB  from './databaseConnection';
import * as bodyParser from "body-parser";
import { postRoute } from './routes/post.route';
import { json, urlencoded } from "body-parser";
const morgan = require('morgan')
import  cors from  'cors'


dotenv.config();

const HOST = process.env.HOST;
const PORT = parseInt(process.env.PORT || '4000');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw());
// app.use(bodyParser.urlencoded());
app.use(json());
app.use(cors());
app.options("*", cors());
app.use(urlencoded({ extended: true }));
app.use(morgan("tiny"));


app.use('/api', postRoute());



app.listen(PORT, async () => {
  await connectDB();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
