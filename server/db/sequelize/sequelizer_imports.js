const SequelizeModels = require("sequelize-models");
var SequelizeAuto = require('sequelize-auto');
const _ = require('lodash')

var seqModels = new SequelizeModels({
    // Database connection options
    connection: {
        host: "sl-us-south-1-portal.31.dblayer.com",
        port: 54766,
        dialect: "postgres",
        username: "simple_lending_user",
        schema: "atb_lending",
        password: "UECPKNPXE4GISQHD",
        ssl: true
    },

    // Models loading options
    models: {
        autoLoad: true,
        path: "/models"
    },

    // Sequelize options passed directly to Sequelize constructor
    sequelizeOptions: {
        define: {
            freezeTableName: true,
            underscored: true,
            schema: 'simple_business_lending',
        }
    }
});


seqModels.getSchema().then(schema => {
    // schema.models and schema.db available here
    // console.log(schema.db)

    if (schema.models) {
        _.forEach(schema.models, (model) => {
            console.log(model);
            // if (model === 'lending_application') {
            // console.log('test')
            const Model = schema.db.model(model);
            if (Model) {
                const application = Model.findById('SL2229').then((application) => {
                    console.log(application);
                }).catch(err => console.log(err));
            }

            // }
        })
    }
    // var auto = new SequelizeAuto(schema.db,
    //     {
    //         additional: {
    //             timestamps: false
    //         },
    //         tables: ['borrower']
    //     });

    // auto.run(function (err) {
    //     if (err) throw err;

    //     console.log(auto.tables); // table list
    //     console.log(auto.foreignKeys); // foreign key list
    // });
})
    .catch(err => {
        // throwing error out of the promise
        setTimeout(() => { throw err });
    });