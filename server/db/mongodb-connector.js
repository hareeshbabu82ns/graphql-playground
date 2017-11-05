const stitch = require("mongodb-stitch");
const client = new stitch.StitchClient("time-tracker-kpzvu");

const DB_NAME = "hacker_news";

const db = client.service("mongodb", "mongodb-atlas").db(DB_NAME);

module.exports = async () => {
  try {
    await client.authenticate("apiKey", process.env.MDB_API_KEY);
    console.log("[MongoDB Stitch] Connected to Stitch");
    return {
      client,
      uid: client.authedId(),
      Links: db.collection("links")
    };
  } catch (e) {
    console.error(e);
    return {};
  }
  // client
  //   .login()
  //   .then(() => {
  //     console.log("[MongoDB Stitch] Connected to Stitch");
  //     return {
  //       client,
  //       uid: client.authedId(),
  //       Links: db.collection("links")
  //     };
  //   })
  //   .catch(e => {
  //     console.error(e);
  //   });
};
// client
//   .login()
//   .then(() =>
//     db
//       .collection("links")
//       .updateOne(
//         { owner_id: client.authedId() },
//         { $set: { number: 42 } },
//         { upsert: true }
//       )
//   )
//   .then(() => db.collection("links").find({ owner_id: client.authedId() }))
//   .then(docs => {
//     console.log("Found docs", docs);
//     console.log("[MongoDB Stitch] Connected to Stitch");
//   })
//   .catch(err => {
//     console.error(err);
//   });
