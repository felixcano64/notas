const mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV === 'dev') {
    mongoose.connect('mongodb://localhost/notas', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(db => console.log('Conectado a las base de datos'))
        .catch(err => console.error(err));
} else {
    mongoose.connect('mongodb+srv://jorlaf:9Bot2j3XtAazIoUV@cluster0.9axsh.mongodb.net/notas?retryWrites=true&w=majority', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(db => console.log('Conectado a las base de datos'))
        .catch(err => console.error(err));
}