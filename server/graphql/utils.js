const _ = require('lodash');

module.exports = {
    fetchCurrentSelectionFields: (executionContext) => {
        // const fields = [];
        // get Current Selections
        const selections = _.get(executionContext, 'fieldNodes[0].selectionSet.selections');
        if (_.isUndefined(selections)) {
            return [];
        }
        // executionContext.fieldNodes[0].selectionSet.selections[0].name.value
        return selections
            .filter((selection) => _.isUndefined(_.get(selection, 'selectionSet')))
            .map((selection) => _.get(selection, 'name.value'));
    }
}