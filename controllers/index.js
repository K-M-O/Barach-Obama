// all modules.

const Product = require('../models/product')
const Image = require('../models/image')

// controller.

module.exports = async(req, res) => {
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
    var apartments = []
    try {
        let products = await query.exec()
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
                res.redirect('/')
            }
        })
    } catch {
        res.cookie('error','failed to get apartments')
        res.redirect('/')
    }
}