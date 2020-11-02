// all modules.

const Product = require('../models/product')
const Image = require('../models/image')
const Report = require('../models/report')
const User = require('../models/user')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// controllers.

exports.getProduct = async (req,res) => {
    if (req.cookies){
        try {
            const username = req.cookies.username
            const token = req.cookies.refreshToken
            const product = await Product.findById(req.params.id).exec()
            const images = await Image.find({product: req.params.id}).exec()
            const params = {}
            if (username != null && username != undefined) {
                const user = await User.find({ username: username, token: token}).exec()
                params.checkAdmin = user[0].isAdmin
            } else params.checkAdmin = undefined
            if (product == null || product == undefined) return res.cookie('error','error 301 get the apartment information, please try again!'),res.redirect('/')
            params.product = product
            params.images = images
            res.render('products/show', params)
        } catch {
            res.cookie('error','error 302 get the apartment information, please try again!')
            res.redirect('/')
        }
    } else {
        res.cookie('error','error user inforamtion is incorrect')
        res.redirect('/as/login')
    }
}

exports.getNewProduct = (req, res) => {
    res.render('products/new')
}

exports.orderProduct = async (req, res) => {
    const user = await User.find({username: req.cookies.username, token: req.cookies.refreshToken}).exec()
    const report = new Report({
        title:'apartment ordered',
        action:`Apartment id: ${req.params.id}`,
        reportedBy: `${user[0].id}`,
        reportType: 'orderReport'
    })
    await report.save()
    res.cookie('message',`your order have been sent we will contact you soon!`)
    res.redirect(`./show`)
}

exports.postNewProduct = async (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    })
    try {
        const newProduct = await product.save()
        if (typeof req.body.images === 'object'){
            let images = req.body.images
            images = images.reverse()
            var checkMain = false,i = 0
            images.forEach(async function(imageCode) {
                i++
                try {
                    if (i == 1) checkMain = true
                    else checkMain = false
                    saveImage(new Image(),imageCode,newProduct.id,checkMain)
                } catch(err){
                    console.log(err)
                }
            })
        } else {
            let imageCode = req.body.images
            saveImage(new Image(),imageCode,newProduct.id,true)
        }
        const report = new Report({
            title:'apartment added',
            action:`id : ${newProduct.id},reason : ${req.body.reason}`,
            reportedBy: `${req.cookies.username}`,
            reportType: 'productReport'
        })
        await report.save()
        res.redirect(`./${newProduct.id}/show`)
    } catch (err){
        console.log(err);
        res.cookie('error','error create new apartment')
        res.redirect('/p/new')
    }
}

exports.updateProduct = async (req, res) => {
    if ( req.body.title == null || req.body.title === '') return res.cookie('error','title is needed'),res.redirect('./show')
    if ( req.body.description == null || req.body.description === '') return res.cookie('error','description is needed'),res.redirect('./show')
    if ( req.body.price == null || req.body.price == 0) return res.cookie('error','price is needed'),res.redirect('./show')
    try {
        const product = await Product.findById(req.params.id)
        product.title = req.body.title
        product.description = req.body.description
        product.price = req.body.price
        await product.save()
        const report = new Report({
            title:'apartment updated',
            action:`id : ${product.id},reason : ${req.body.reason}`,
            reportedBy: `${req.cookies.username}`,
            reportType: 'productReport'
        })
        await report.save()
        res.redirect('./show')
    } catch {
        res.cookie('error','failed to update user')
        res.redirect('./show')
    }
}

exports.removeProduct = async (req, res) => {
    try {
        const product = await  Product.findById(req.params.id).exec()
        const report = await new Report({
            title: 'apartment removed',
            action: `reason : ${req.body.reason}`,
            reportedBy: `${req.cookies.username}`,
            reportType: 'manageReport'
        })
        await product.remove()
        await report.save()
        res.redirect(`/p/new`)
    } catch {
        res.cookie('error','error removing the apartment')
        res.redirect('./show')
    }
}
async function saveImage(image, coverEncoded, productId, main) {
    try {
        if (coverEncoded == null) return res.cookie('error','error saving images!'),res.redirect('/')
        const cover = JSON.parse(coverEncoded)
        if (cover != null && imageMimeTypes.includes(cover.type)) {
            image.image = new Buffer.from(cover.data, 'base64')
            image.imageType = cover.type
            image.product = productId
            image.main = main
            await image.save()
        }
    } catch{
        res.cookie('error','error create new apartment')
        res.redirect('/p/new')
    }
}