module.exports = (req,res,next)=>{
    if (req.cookies.token){
        const token = req.cookies.token
        if ( token != null) return res.cookie('error','you have to logout first'),res.redirect('/')
        next()
    }
}