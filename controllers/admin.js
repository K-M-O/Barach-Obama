// all modules.

const User = require('../models/user')
const Report = require('../models/report')

// controllers.

exports.getAdminPanel = (req,res) => {
    res.render('admin/adminPanel')
}

exports.getAdminManage = async (req,res) => {
    const users = await User.find({isAdmin: false}).exec()
    res.render('admin/manage',{users: users})
}

exports.getAdminOrders = async (req,res) => {
    const orders = await Report.find({reportType: 'orderReport'}).exec()
    res.render('admin/orders',{orders: orders})
}

exports.getAdminReports = async (req,res) => {
    const authReports = await Report.find({reportType: 'authReport'}).exec()
    const productReports = await Report.find({reportType: 'productReport'}).exec()
    const adminReports = await Report.find({reportType: 'adminReport'}).exec()
    res.render('admin/reports',{
        authReports: authReports,
        productReports: productReports,
        adminReports: adminReports
    })
}

exports.deleteUser = async(req,res) => {
    const user = await User.findById(req.body.userId).exec()
    const report = await new Report({
        title: 'remove user',
        action: `reason: ${req.body.reason}`,
        reportedBy: `${req.cookies.username}`,
        reportType: 'authReport'
    })
    report.save()
    console.log(user)
    user.remove()
    res.redirect('/a/adminPanel')
}