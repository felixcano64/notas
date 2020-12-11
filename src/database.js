const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notas', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('Conectado a las base de datos'))
    .catch(err => console.error(err));