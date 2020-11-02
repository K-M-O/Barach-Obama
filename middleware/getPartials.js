exports.username = (req,res,next) => {
    if (req.cookies.username) {
        const user = req.cookies.username
        if (user != null) res.locals.user = user
    }
    next()
}
exports.error = (req,res,next) => {
    if (req.cookies.error) {
        const error = req.cookies.error
        if (error != null) {
            res.locals.errorMessage = error
            res.clearCookie('error')
        }
    }
    next()
}
exports.message = (req,res,next) => {
    if (req.cookies.message) {
        const message = req.cookies.message
        if (message != null) {
            res.locals.message = message
            res.clearCookie('message')
        }
    }
    next()
}