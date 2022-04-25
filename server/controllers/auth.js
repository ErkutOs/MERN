import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth'

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