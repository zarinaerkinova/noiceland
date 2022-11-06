const User = require('../model/users')
const bcrypt = require('bcrypt')

module.exports.login = async (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'layout',
        error: req.flash('error')
    })
}

module.exports.signup = async (req, res) => {
    res.render('signup', {
        title: 'Signup',
        layout: 'layout',
        error: req.flash('error')
    })
}

module.exports.join = async (req, res) => {
    const { password, tel } = req.body

    req.session.login = false

    const user = await User.findOne({ tel })

    if (!user) {
        req.flash('error', 'This phone number does not exist')
        return res.redirect('/login')
    }

    const compare = await bcrypt.compare(password, user.password)

    if (!compare) {
        req.flash('error', 'Password is wrong')
        return res.redirect('/login')
    }

    req.session.login = true
    req.session.admin = user

    res.redirect('/')
}

module.exports.add = async (req, res) => {
    const { firstName, lastName, img, tel, password } = req.body

    req.session.login = false

    const isPhone = await User.findOne({ tel })

    if (isPhone) {
        req.flash('error', 'This phone number already exits')
        return res.redirect('/signup')
    }

    const hash = await bcrypt.hash(password, 10)
    const user = new User({ firstName, lastName, img, tel, password: hash, admin: false })

    await user.save()

    req.session.login = true

    res.redirect('/')
}

module.exports.logout = async (req, res) => {
    req.session.login = false
    res.redirect('/login')
}
