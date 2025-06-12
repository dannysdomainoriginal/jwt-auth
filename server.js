import express from "express";
import {verifyJWT, checkUsers} from "./middleware/verify-jwt.js";

const app = express()

// JSON body parser
app.use(express.json());

// Url encoded data parser
app.use(express.urlencoded({ extended: true }));

// blog route
import blog from './routes/blog.js'
app.use('/posts', verifyJWT, checkUsers, blog)

// api route
import api from './routes/api.js'
app.use('/api', api)



app.listen(5000, () => console.log('Server started on port 5000'))