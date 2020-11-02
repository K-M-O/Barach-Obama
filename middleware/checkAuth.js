const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.token = (req,res,next)=>{
    if (req.cookies){
        const token = req.cookies.token
        if ( token == null ) return res.cookie('error','no authraction'),res.redirect('/')
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if (err) {
                res.cookie('reqlink',`${req.originalUrl}`)
                res.redirect('/as/token')
            } else {
                req.user = user
                next()
            }
        })
    }
}
exports.validDate = async(req,res,next)=>{
    if (req.cookies.refreshToken && req.cookies.username) {
        const token = req.cookies.refreshToken
        if ( token == null) return res.cookie('error','no authraction'),res.redirect('/')
        var username = req.cookies.username
        if (typeof username === 'object') username = username.username
        try {
            const userData = await User.find({username: username, token: token}).exec()
            if (userData.length == 0) return res.redirect('/as/logout')
            const userDate = userData[0].lastSeen.toString().slice('T').split(" ").slice(1,6)
            switch (userDate[0]){
                case "Jan":
                    userDate[0] = 1
                break
                case "Feb":
                    userDate[0] = 2
                break
                case "Mar":
                    userDate[0] = 3
                break
                case "Apr":
                    userDate[0] = 4
                break
                case "May":
                    userDate[0] = 5
                break
                case "Jun":
                    userDate[0] = 6
                break
                case "Jul":
                    userDate[0] = 7
                break
                case "Aug":
                    userDate[0] = 8
                break
                case "Sep":
                    userDate[0] = 9
                break
                case "Oct":
                    userDate[0] = 10
                break
                case "Nov":
                    userDate[0] = 11
                break
                case "Dec":
                    userDate[0] = 12
                break
                default:
                break
            }
            userDate[1] = parseInt(userDate[1])
            userDate[2] = parseInt(userDate[2])
            userDate[3] = userDate[3].split(':')
            userDate[3][0] = parseInt(userDate[3][0])
            userDate[3][1] = parseInt(userDate[3][1])
            userDate[3][2] = parseInt(userDate[3][2])
            userDate[4] = userDate[4].slice(3).split("")
            userDate[4][1] = parseInt(userDate[4][1] + userDate[4][2])
            userDate[4][2] = parseInt(userDate[4][3] + userDate[4][4])
            userDate[4] = userDate[4].slice(0,3)
            if (userDate[4][0] === '+') {
                userDate[3][0] = userDate[3][0] - userDate[4][1]
                userDate[3][1] = userDate[3][1] - userDate[4][2]
                if (userDate[3][1] < 0)
                {
                    userDate[3][1] = userDate[3][1] + 60
                    userDate[3][0] = userDate[3][0] - 1
                }
            } else if (userDate[4][0] === '-') {
                userDate[3][0] = userDate[3][0] + userDate[4][1]
                userDate[3][1] = userDate[3][1] + userDate[4][2]
                if (userDate[3][1] >= 60)
                {
                    userDate[3][1] = userDate[3][1] - 60
                    userDate[3][0] = userDate[3][0] + 1
                }
            }
            const curDate = new Date().toString().slice('T').split(" ").slice(1,6)
            switch (curDate[0]){
                case "Jan":
                    curDate[0] = 1
                break
                case "Feb":
                    curDate[0] = 2
                break
                case "Mar":
                    curDate[0] = 3
                break
                case "Apr":
                    curDate[0] = 4
                break
                case "May":
                    curDate[0] = 5
                break
                case "Jun":
                    curDate[0] = 6
                break
                case "Jul":
                    curDate[0] = 7
                break
                case "Aug":
                    curDate[0] = 8
                break
                case "Sep":
                    curDate[0] = 9
                break
                case "Oct":
                    curDate[0] = 10
                break
                case "Nov":
                    curDate[0] = 11
                break
                case "Dec":
                    curDate[0] = 12
                break
                default:
                break
            }
            curDate[1] = parseInt(curDate[1])
            curDate[2] = parseInt(curDate[2])
            curDate[3] = curDate[3].split(':')
            curDate[3][0] = parseInt(curDate[3][0])
            curDate[3][1] = parseInt(curDate[3][1])
            curDate[3][2] = parseInt(curDate[3][2])
            curDate[4] = curDate[4].slice(3).split("")
            curDate[4][1] = parseInt(curDate[4][1] + curDate[4][2])
            curDate[4][2] = parseInt(curDate[4][3] + curDate[4][4])
            curDate[4] = curDate[4].slice(0,3)
            if (curDate[4][0] === '+') {
                curDate[3][0] = curDate[3][0] - curDate[4][1]
                curDate[3][1] = curDate[3][1] - curDate[4][2]
                if (curDate[3][1] < 0)
                {
                    curDate[3][1] = curDate[3][1] + 60
                    curDate[3][0] = curDate[3][0] - 1
                }
            } else if (curDate[4][0] === '-') {
                curDate[3][0] = curDate[3][0] + curDate[4][1]
                curDate[3][1] = curDate[3][1] + curDate[4][2]
                if (curDate[3][1] >= 60)
                {
                    curDate[3][1] = curDate[3][1] - 60
                    curDate[3][0] = curDate[3][0] + 1
                }
            }
            if (curDate[2] - userDate[2] <= 1) {
                if (curDate[2] - userDate[2] == 1) curDate[0] = curDate[0] + 12
                if (curDate[0] - userDate[0] <= 1) {
                    if (curDate[0] - userDate[0] == 1) curDate[1] = curDate[1] + 30
                    if (curDate[1] - userDate[1] <= 1) {
                        if (curDate[1] - userDate[1] == 1) curDate[3][0] = curDate[3][0] + 24
                        if (curDate[3][0] - userDate[3][0] <= 24) {
                            if (curDate[3][0] - userDate[3][0] == 24){
                                if (userDate[3][1] - curDate[3][1] >= 0) {
                                    if (userDate[3][1] - curDate[3][1] == 0){
                                        if (userDate[3][2] - curDate[3][2] >= 0){
                                            if (userDate[3][2] - curDate[3][2] == 0) return res.redirect('/as/logout')
                                            next()
                                        } else return res.redirect('/as/logout')
                                    }
                                    next()
                                } else return res.redirect('/as/logout')
                            }
                            next()
                        } else return res.redirect('/as/logout')
                    } else return res.redirect('/as/logout')
                } else return res.redirect('/as/logout')
            } else return res.redirect('/as/logout')
        }
        catch {
            res.cookie('error','no authraction'),res.redirect('/')
        }
    }
}