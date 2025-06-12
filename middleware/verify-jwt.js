// JWT import
import jwt from "jsonwebtoken";
import users from '../models/users.json' with {type: "json"}

/*
    FORMAT OF TOKEN
    Authorization: Bearer <access_token>
*/

// verify token
const verifyJWT = (req, res, next) => {
    // get auth header, alternative to cookies 
    const authHeader = req.headers['authorization']

    if(typeof authHeader == undefined) return res.sendStatus(401) // unauthorized

    const token = authHeader.split(' ')[1]
    req.token = token

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.sendStatus(403) // forbidden
            
        req.user = decoded.user
        next()
    })
}

// set user based on token
const checkUsers = (req, res, next) => {
    const { name, email} = req.user
    const target = users.find(user => user.name == name && user.email == email)
    console.log(target)
    if (!target) return res.json({message: "User not found"}) // unauthorized

    // here you set global user object to user but for this project I just set a variable to true
    req.authorized = true

    next ()
}

export {verifyJWT, checkUsers}