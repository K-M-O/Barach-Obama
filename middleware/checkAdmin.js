const User = require('../models/user')

module.exports = async(req,res,next)=>{
    if (req.cookies && req.user){
        const token = req.cookies.refreshToken
        if ( token == null) return res.cookie('error','failed authraction'),res.redirect('/')
        const user = req.user
        var username = user.username
        if (typeof username === 'object') username = username.username
        try {
            const userData = await User.find({ username: username, token: token}).exec()
            if ( userData[0].isAdmin == false) return res.cookie('error','failed authraction'),res.redirect('/')
            next()   
        } catch{
            res.cookie('error','failed authraction'),res.redirect('/')
        }
    }
}