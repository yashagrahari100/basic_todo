const { User } = require("../model/user_model");
const { z } = require("zod");
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { generateTokenAndSaveInCookies } = require("../jwt/token");


const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "Username atleast 3 character long" }),
    password: z.string().min(6, { message: "Password alteast 6 character long" }),
})

const register = async (req, res) => {
    try {

        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(411).json({ errors: "All fields are required" })
        }
        const validation = userSchema.safeParse({ email, username, password })
        if (!validation.success) {
            //return console.log(validation.error.issues)

            const errorMessage = validation.error.issues.map((err) => err.message)


            return res.status(401).json({ errors: errorMessage })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ errors: "User Already exists" })

        }
        const hashPassword = await bycrypt.hash(password, 10)
        const newUser = await User.create({ email, username, password: hashPassword })
        if (newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id,res);
            

            res.status(201).json({ message: "User registered successfully", newUser ,token  })

        }
    } catch (error) {
        console.log(error);
        res.status(411).json({ message: "error registering user" })


    }

}

const login = async (req,res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(500).json({ errors: "All fields are required " })
        }
        const user = await User.findOne({ email }).select("+password")
        if (!user || !(await bycrypt.compare(password, user.password))) {
            return res.status(400).json({message:"Invalid email or password"})

        }
        const token = await generateTokenAndSaveInCookies(user._id,res);

        res.status(200).json({message:"User Logged in successfully",user,token})

        }catch (error) {
            console.log(error);
            res.status(500).json({ errors: "Error logging user" })



        }

    }

  const Logout = async (req,res) => {
        try {
            res.clearCookie("jwt",{
                path:'/',

            })
            res.status(200).json({message:"User logged out successfully"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Error logging out user"})
            
        }

    }

    module.exports = {
        register, login, Logout
    }
