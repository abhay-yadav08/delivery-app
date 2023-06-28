const express = require('express')

const router = express.Router()

const User = require('../models/User')

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const jwtSecret = "helloJaunpurIsABeautifulCityy#!"

router.post("/createuser",
    // username must be an email
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', "incorrect password").isLength({ min: 5 }),
    async (req, res) => {



        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);

        try {
            await User.create({
                // name: "abhishek",
                // password: "12345",
                // email : "abhishek123@gmail.com",
                // location : "rrtttd"


                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location

            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })




router.post("/loginuser",
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', "incorrect password").isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email
        try {
            let userData = await User.findOne({email})

            if (!userData) {
                return res.status(400).json({ errors: "try login with correct credentials" });
            }

            const passCompare = await bcrypt.compare(req.body.password ,userData.password)
            if (!passCompare) {
                return res.status(400).json({ errors: "try login with correct credentials" });
            }

            const data = {
                user :{
                    id:userData.id
                }
            }

            const authtoken = jwt.sign(data,jwtSecret);
            return res.json({ success: true , authtoken:authtoken});

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })



module.exports = router;