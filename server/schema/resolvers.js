const { BSON } = require("mongodb-extjson");
const { ObjectID } = BSON;

module.exports = {
  Query: {
    links: async (root, data, { db: { Links } }) => {
      // const docs = await Links.find({ owner_id: uid });
      const docs = await Links.find({});
      // console.log(docs);
      return docs;
    }
  },
  Mutation: {
    createLink: async (root, data, { db: { Links } }) => {
      const response = await Links.insert(data);
      const link = Object.assign({ id: response.insertedIds[0] }, data);
      return link;
    },
    removeLink: async (root, { id }, { db: { Links } }) => {
      const response = await Links.deleteOne({ _id: new ObjectID(id) });
      // console.log(response);
      return response.deletedCount;
    },
    updateLink: async (root, data, { db: { Links } }) => {
      const id = data.id;
      data.id = undefined;
      const response = await Links.updateOne(
        { _id: new ObjectID(id) },
        { $set: data }
      );
      // console.log(response);
      return response.result[0];
    }
  },
  Link: {
    id: root => root._id || root.id
  }
};
