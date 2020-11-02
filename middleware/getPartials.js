module.exports = (req,res,next) => {
    if (req.cookies) {
        const user = req.cookies.username
        const error = req.cookies.error
        const message = req.cookies.message
        if (user != null) res.locals.user = user
        if (error != null) {
            res.locals.errorMessage = error
            res.clearCookie('error')
        }
        if (message != null) {
            res.locals.message = message
            res.clearCookie('message')
        }
    }
    next()
}