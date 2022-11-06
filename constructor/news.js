const News = require('../model/news')

module.exports.get = async (req, res) => {
    const news = await News.find()
    res.render('news', {
        title: 'News',
        layout: "main",
        photo: news.photo,
        about: news.about,
        title: news.title,
        author: news.author,
        news
    })
}

module.exports.add = async (req, res) => {
    res.render('newsAdd', {
        title: 'News add'
    })
}

module.exports.postNews = async (req, res) => {
    const { photo, about, title, paragraph, author } = req.body

    const news = new News({
        photo, 
        about, 
        title, 
        paragraph, 
        author
    })

    await news.save()

    res.redirect('/news')
}
