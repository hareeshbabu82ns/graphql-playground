const Waterline = require('waterline');
const waterline = new Waterline();



// configure Models
waterline.registerModel(Waterline.Collection.extend(require('./models/lending_application')));
waterline.registerModel(Waterline.Collection.extend(require('./models/borrower')));
waterline.registerModel(Waterline.Collection.extend(require('./models/applicant')));
waterline.registerModel(Waterline.Collection.extend(require('./models/lending_application.mongo')));

// initialize Waterline ORM
waterline.initialize(require('./config'), (err, connection) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('waterline connected');

    waterline.connection = connection;
});

// finally export
module.exports = waterline;