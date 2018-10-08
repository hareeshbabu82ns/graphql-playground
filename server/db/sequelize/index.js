const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//     'postgresql://simple_lending_user:UECPKNPXE4GISQHD@sl-us-south-1-portal.31.dblayer.com:54766/atb_lending?ssl=true',
//     {
//         dialect: 'postgres',
//         define: {
//             timestamps: false // true by default
//         }
//     });

const sequelize = new Sequelize('atb_lending',
    'simple_lending_user', 'UECPKNPXE4GISQHD',
    // 'postgresql://simple_lending_user:UECPKNPXE4GISQHD@sl-us-south-1-portal.31.dblayer.com:54766/atb_lending?ssl=true',
    {
        host: 'sl-us-south-1-portal.31.dblayer.com',
        port: 54766,
        dialect: 'postgres',
        // native: true, //use native driver (useful for ssl)
        define: {
            underscored: true,
            freezeTableName: true,
            timestamps: false
        }
    });

if (sequelize)
    console.log('Sequelize Connected');

const Applications = sequelize.import('./models/lending_application');
const Borrowers = sequelize.import('./models/borrower')
const Applicants = sequelize.import('./models/applicant')

// module.exports = { sequelize, models: { Applications, Borrowers, Applicants } };
module.exports = sequelize;


// // Applicant.find().then(applicants => console.log(applicants));
// (async () => {
//     // const data = await sequelize.query('select * from simple_business_lending.lending_application',
//     // {raw:true});
//     // const data = await Applications.findAll();
//     const ApplicationModel = sequelize.model('lending_application')
//     const data = await ApplicationModel.findById('SL2229');
//     console.log(data);
// })();