import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if(!name){
            return res.status(400).send("Name is required")
        }

        if(!password || password.length < 6){
            return res.status(400).send("Password is required with minimum of 6 characters")
        }

        let userExist = await User.findOne({email: email})
        if(userExist){
            return res.status(400).send('Email is taken')
        }

        const hashedPassword = await hashPassword(password)
        const user = await new User({
            name,
            email,
            password: hashedPassword
        }).save()
        return res.json({success: true})
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error...')
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email: email}).exec()

        if(!user){
            return res.status(400).send("No user found")
        }

        const match = await comparePassword(password, user.password)
        const token = jwt.sign({_id: User._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        user.password = undefined
        res.cookie('token', token, {
            httpOnly: true
            //secure: true
        })
        res.json(user)
    } catch (error) {
        if(error){
            console.log(error)
            return res.status(400).send("Error! Please try again")
        }
    }
}