module.exports = async (req,res,next)=>{
    if (req.cookies){
        const token = req.cookies.token
        if ( token != null) return res.cookie('error','you have to logout first'),res.redirect('/')
        next()
    }
}