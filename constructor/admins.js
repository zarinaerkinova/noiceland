const Admin = require('../model/admins')
const bcrypt = require('bcrypt')

module.exports.signup = async (req, res) => {
    res.render('adminsignup', {
        title: 'Admin',
        layout: 'layout',
        error: req.flash('error')
    })
}

module.exports.signin = async (req, res) => {
    res.render('adminsignin', {
        title: 'Admin',
        layout: 'layout',
        error: req.flash('error')
    })
}

module.exports.join = async (req, res) => {
    const {password, tel} = req.body

    req.session.login = false

    const user = await Admin.findOne({tel})

    if(!user) {
        req.flash('error', 'This phone number does not exist')
        return res.redirect('/cucumber/signin')
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare) {
        req.flash('error', 'Password is wrong')
        return res.redirect('/cucumber/signin')
    }

    console.log(user);

    req.session.login = true
    req.session.admin = user

    res.redirect('/')
}

module.exports.add = async (req, res) => {
    const {firstName, lastName, img, tel, password} = req.body
    
    const isPhone = await Admin.findOne({tel})

    if(isPhone) {
        req.flash('error', 'This phone number already exits')
        return res.redirect('/cucumber/signup')
    }

    const hash = await bcrypt.hash(password, 10)
    const user = new Admin({firstName, lastName, img, tel, password: hash, admin: true})

    await user.save()
    req.session.login = true

    res.redirect('/')
}

module.exports.logout = async (req, res) => {
    req.session.login = false
    res.redirect('/login')
}

