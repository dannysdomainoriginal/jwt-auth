import express from "express";
const router = express.Router()

import { verifyJWT } from "../middleware/verify-jwt.js";
import jwt from 'jsonwebtoken'

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
})

router.post('/posts', verifyJWT,  (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) return res.sendStatus(403)
            
        res.json({
            message: "Post created....",
            authData
        })
    })


})

// Login Route
router.post('/login', (req, res) => {
    const user = {id: 1, name: "Charles", email: "da@gmail.com"}

    const token = jwt.sign({user}, 'secretKey', {expiresIn: '1d'})
    res.json({token})   
})

export default router