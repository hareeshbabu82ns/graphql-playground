const _ = require('lodash');
const dbMap = require('./SBL_Mongo_to_PgSQL_map');


const mapToPgSQL = ({ pgMapKey, mongoRootObj, mongoCurrentObj, parentValue }) => {
    const preparedObject = {};
    _.forEach(dbMap[pgMapKey], (value, key) => {
        if (key.startsWith('_pg') ||
            _.isUndefined(value) ||
            _.isArray(value)) {
            return;
        }
        if (_.isObject(value)) {
            const sourceObj = (value.isRootPath) ? mongoRootObj : mongoCurrentObj;
            preparedObject[key] =
                (value.transform)
                    ? value.transform(_.get(sourceObj, value.path))
                    : _.get(sourceObj, value.path);
        } else if (value === '_parentKey') {
            preparedObject[key] = parentValue;
        } else {
            preparedObject[key] = _.get(mongoCurrentObj, value);
        }
    });
    // console.log(preparedObject);
    return preparedObject;
}

module.exports = async (waterline, mongoObj) => {

    //prepare application object
    const application = mapToPgSQL({
        pgMapKey: 'application',
        mongoRootObj: mongoObj,
        mongoCurrentObj: mongoObj
    });
    // fetch collection
    const LendingApplication = waterline.connection.collections['lending_application'];
    // create record
    const result = await LendingApplication.create(application);

    //prepare borrower object
    const borrower = mapToPgSQL({
        pgMapKey: 'borrower',
        mongoRootObj: mongoObj,
        mongoCurrentObj: mongoObj.borrower
    });
    // fetch collection
    const Borrower = waterline.connection.collections['borrower'];
    // create record
    const newBorrower = await Borrower.create(borrower).meta({ fetch: true });

    _.forEach(mongoObj.borrower.applicants, async (value, key) => {

        //prepare applicant object
        const applicant = mapToPgSQL({
            pgMapKey: 'applicant',
            mongoRootObj: mongoObj,
            mongoCurrentObj: value,
            parentValue: newBorrower.borrower_skey,
        });
        // fetch collection
        const Applicant = waterline.connection.collections['applicant'];
        // create record
        await Applicant.create(applicant);

    });
};