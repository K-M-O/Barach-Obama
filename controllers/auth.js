// all modules.

const User = require('../models/user')
const Report = require('../models/report')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// get controllers

exports.getAuthLogIn = async (req,res) => {
    res.render('auth/login')
}

exports.getAuthSignUp = async (req,res) => {
    res.render('auth/signup')
}

exports.getAuthToken = async (req,res) => {
    res.render('auth/token')
}

exports.getAuthLogOut = async (req,res) => {
    res.render('auth/logout')
}

// post controllers

exports.postAuthLogIn = async (req,res) => {
    if (req.body.email == null || req.body.email == '') return res.cookie('error','email is required to login'),res.redirect('/as/login')
    if (req.body.password == null || req.body.passsword == '') return res.cookie('error','password is required to login'),res.redirect('/as/login')
    const user = await User.find({email: req.body.email}).exec()
    if (typeof user === 'object' || typeof user === Array){
    if (user.length != 1) return res.cookie('error','failed to login'),res.redirect('/as/login')
    } else if (user[0] == null) return res.cookie('error','failed to login'),res.redirect('/as/login')
    if (user[0].email.indexOf('@') < 0 || user[0].email.split('@')[1].indexOf('.') < 0) return res.cookie('error','failed to login'),res.redirect('/as/login')
    if (user[0].password.length <= 7) return res.cookie('error','failed to login'),res.redirect('/as/login')
    bcrypt.compare(req.body.password, user[0].password, async(err, result)=>{
        if (err) return res.cookie('error','error while login please try again!'),res.redirect('/as/login')
        if (result) {
            const token = genreateAccessToken({username: user[0].username})
            const refreshToken = jwt.sign({username: user[0].username}, process.env.REFRESH_TOKEN_SECRET)
            user[0].token = refreshToken
            user[0].lastSeen = new Date()
            user[0].active = true
            user[0].save()
            if (user[0].isAdmin == true){
                const report = await new Report({
                    title:`admin login`,
                    action:`admin name : ${user[0].username}`,
                    reportedBy: 'system',
                    reportType: 'adminReport'
                })
                await report.save()
            }
            res.cookie('token',`${token}`)
            res.cookie('refreshToken',`${refreshToken}`)
            res.cookie('username',`${user[0].username}`)
            res.redirect('/')
        } else return res.cookie('error','failed to login'),res.redirect('/as/login')
    })
}

exports.postAuthToken = async (req,res)=>{
    const refreshToken = req.cookies.refreshToken
    const link = req.cookies.reqlink
    if (refreshToken == null) return res.redirect('/as/login')
    if (link == null || link == undefined) return res.redirect('/')
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect('/as/logout')
    const token = genreateAccessToken({ username : user})
    res.cookie('token',`${token}`)
    res.clearCookie('reqlink')
    res.redirect(`${link}`)
    })
}

exports.postAuthSignUp = async (req, res) => {
    if ( req.body.email == null || req.body.email === '') return res.cookie('error','email is needed'),res.redirect('/as/signup')
    if ( req.body.username == null || req.body.username === '') return res.cookie('error','username is needed'),res.redirect('/as/signup')
    if ( req.body.password == null || req.body.password === '') return res.cookie('error','password is needed'),res.redirect('/as/signup')
    if ( req.body.confirmPassword == null || req.body.confirmPassword === '') return res.cookie('error','confirm password is needed'),res.redirect('/as/signup')
    if ( req.body.email.indexOf('@') < 0 || req.body.email.split('@')[1].indexOf('.') < 0) return res.cookie('error','email should be : example@example.com'),res.redirect('/as/signup')
    if ( req.body.password.length < 7) return res.cookie('error','password is too short'),res.redirect('/as/signup')
    if ( req.body.password !== req.body.confirmPassword) return res.cookie('error','confirm password and password dont match!'),res.redirect('/as/signup')
    try {
        const checkUsers = await User.find({email : req.body.email})
        if (checkUsers.length > 0) return res.cookie('error','failed to signup, check your information and try again!'),res.redirect('/as/signup')
        const encryptedPassword = await bcrypt.hash(req.body.password, 16)
        const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: encryptedPassword,
        })
        const newUser = await user.save()
        const report = new Report({
            title:'user signup',
            action:`user id : ${newUser.id}`,
            reportedBy: 'system',
            reportType: 'authReport'
        })
        const newReport = await report.save()
        newUser.report = newReport.id
        res.redirect('/as/login')
    } catch {
        res.cookie('error','failed to signup')
        res.redirect('/as/signup')
    }
}

// delete controllers.

exports.deleteAuthLogOut = async (req, res)=>{
    const user = await User.find({token: req.cookies.refreshToken}).exec()
    req.cookies.refreshToken
    if (user.length != 0){
        user[0].token = ``;
        user[0].save()
        if (user[0].isAdmin == true){
            const report = await new Report({
                title:`admin logout`,
                action:`admin name : ${user[0].username}`,
                reportedBy: 'system',
                reportType: 'adminReport'
            })
            await report.save()
        }
    }
    res.clearCookie('refreshToken')
    res.clearCookie('token')
    res.clearCookie('username')
    res.redirect('/as/login')
}

// JWT token Genreator.

function genreateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}