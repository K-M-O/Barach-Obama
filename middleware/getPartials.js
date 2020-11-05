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
exports.selectLang = (req,res,next) => {
    if (req.cookies.lang) {
        const lang = req.cookies.lang
        const dir = req.cookies.dir
        if (lang != null) {
            res.locals.lang = lang
            res.locals.dir = dir
            next()
        } else res.redirect('/lang')
    } else res.cookie('lang','default'),res.redirect('/lang')
}