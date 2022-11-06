const mongoose = require('mongoose')

module.exports = async (uri) => {
    await mongoose.connect(uri, (err) => {
        if(err) {
            console.log(err);
        } 
        console.log('Mongodb connected');
    })
}
