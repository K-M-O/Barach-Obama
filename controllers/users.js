// all modules.

const User = require('../models/user')
const Report = require('../models/report')
const Message = require('../models/message')
const bcrypt = require('bcrypt')
const user = require('../models/user')

// controllers.

exports.getUserProfile = async(req,res) => {
    if (req.cookies)
    {
        const username = req.cookies.username
        const token = req.cookies.refreshToken
        const user = await User.find({ username: username, token: token}).exec()
        res.render('users/profile',{users: user})
    }
}

exports.getUserMangae = async(req,res) => {
    if (req.cookies)
    {
        const username = req.cookies.username
        const token = req.cookies.refreshToken
        const user = await User.find({ username: username, token: token}).exec()
        res.render('users/manage',{users: user})
    }
}

exports.getUserInbox = async(req,res) => {
    const messages = await Message.find({to : `${req.cookies.username}`}).exec()
    res.render('users/inbox',{messages : messages})
}

exports.getMessage = async (req,res) => {
    res.render('users/message')
}

exports.postMessage = async(req,res) => {
    const username = req.cookies.username
    const token = req.cookies.refreshToken
    const sender = await User.find({ username: username, token: token}).exec()
    const recevier = await user.findById(req.query.userId).exec()
    const newMessage = await new Message({
        content: req.body.content,
        from: `${sender[0].username} (admin)`,
        to: `${recevier.username}`
    })
    await newMessage.save()
    res.redirect('/a/adminPanel')
}

exports.postUserUpdate = async(req,res) => {
    if ( req.body.email == null || req.body.email === '') return res.cookie('error','email is needed'),res.redirect('/u/manage')
    if ( req.body.username == null || req.body.username === '') return res.cookie('error','username is needed'),res.redirect('/u/manage')
    if ( req.body.password == null || req.body.password === '') return res.cookie('error','password is needed'),res.redirect('/u/manage')
    if ( req.body.confirmPassword == null || req.body.confirmPassword === '') return res.cookie('error','confirm password is needed'),res.redirect('/u/manage')
    if ( req.body.email.indexOf('@') < 0 || req.body.email.split('@')[1].indexOf('.') < 0) return res.cookie('error','email should be : example@example.com'),res.redirect('/u/manage')
    if ( req.body.password.length < 7) return res.cookie('error','password is too short'),res.redirect('/u/manage')
    if ( req.body.password !== req.body.confirmPassword) return res.cookie('error','confirm password and password dont match!'),res.redirect('/u/manage')
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password, 16)
        if (req.cookies) {
            const username = req.cookies.username
            const token = req.cookies.refreshToken
            const user = await User.find({username: username, token: token})
            user[0].email = req.body.email
            user[0].username = req.body.username
            user[0].password = encryptedPassword
            await user[0].save()
            const report = new Report({
                title:'user updated',
                action:`user id : ${user[0].id}`,
                reportedBy: 'system',
                reportType: 'authReport'
            })
            await report.save()
            res.clearCookie('username')
            res.cookie('username',`${user[0].username}`)
            res.redirect('/u/profile')
        }
    } catch {
        res.cookie('error','failed to update user')
        res.redirect('/u/manage')
    }
}

exports.deleteUser = async(req,res) => {
    if (req.cookies) {
        const username = req.cookies.username
        const token = req.cookies.refreshToken
        try {
            const user = await User.find({username: username, token: token}).exec()
            await user[0].save()
            const report = new Report({
                title:'user removed',
                action:`reason : feedback will be available soon!`,
                reportedBy: 'system',
                reportType: 'authReport'
            })
            await report.save()
            await user[0].remove()
            res.redirect('/as/logout')
        } catch {
            res.cookie('error','failed to remove user')
            res.redirect('/u/manage')
        }
    }
}