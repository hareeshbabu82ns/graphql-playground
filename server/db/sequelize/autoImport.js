var SequelizeAuto = require('sequelize-auto')

// var auto = new SequelizeAuto('postgresql://sl-us-south-1-portal.31.dblayer.com:54766/atb_lending?ssl=true', 'simple_lending_user', 'UECPKNPXE4GISQHD');
// var auto = new SequelizeAuto('postgresql://simple_lending_user:UECPKNPXE4GISQHD@sl-us-south-1-portal.31.dblayer.com:54766/atb_lending?ssl=true');

// auto.run(function (err) {
//     if (err) throw err;

//     console.log(auto.tables); // table list
//     console.log(auto.foreignKeys); // foreign key list
// });

// With options:

// 'postgresql://simple_lending_user:UECPKNPXE4GISQHD@sl-us-south-1-portal.31.dblayer.com:54766/atb_lending?ssl=true'
var auto = new SequelizeAuto('atb_lending', 'simple_lending_user', 'UECPKNPXE4GISQHD',
    {
        host: 'sl-us-south-1-portal.31.dblayer.com',
        port: 54766,
        dialect: 'postgres',
        // directory: false, // prevents the program from writing to disk,
        // schema: 'simple_business_lending',
        additional: {
            timestamps: false
        },
        // tables: ['borrower']
    });

auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});    