// all modules.

const Product = require('../models/product')
const Image = require('../models/image')

// controller.

exports.searchOptions = async (req, res, next) => {
    let query = Product.find().sort({ createdAt: 'desc' })
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.max != null && req.query.max != '') {
        query = query.lte('price', req.query.max)
    }
    if (req.query.min != null && req.query.min != '') {
        query = query.gte('price', req.query.min)
    }
    req.apartments = []
    req.products = await query.exec()
    next()
}
exports.products = (req, res) => {
    var products = req.products
    var apartments = req.apartments
    if ( products.length != 0){
        products.forEach(async function(production) {
            try {
                let cover = await Image.findOne({product: production.id,main: true}).exec()
                apartments[apartments.length] = [production,cover]
                if (apartments.length == products.length){
                    res.render('index', {
                        apartments: apartments,
                        searchOptions: req.query
                    })
                }
            } catch {
                res.cookie('error','error while getting apartments!')
                res.redirect('/')
            }
        })
    } else {
        res.render('index', {
            apartments: apartments,
            searchOptions: req.query
        })
    }
}