## Packages
* express body-parser apollo-server-express graphql-tools graphql
* dotenv (to maintain environment variables)
* mongodb-stitch (for MongoDB on cloud)

## Run
* yarn start - to run 'server/index.js'

## Documentation
* connect to MongoDB stitch in 'server/db/mongodb-connector.js'
  * which returns { client - connection, uid - authenticated user id, ... - Collections to work with}
  
* provide a schema in 'server/schema/hacher_news.graphql'
* load the schema in 'server/schema/index.js'
* provide the resolvers for GQL schema in 'server/schema/resolvers.js'
  * resolvers arguments (root, data, context)
    * root - root/parent object of the resolver tree
    * data - input arguments for current operation
    * context - commong global context passed down through GQL resolver tree

* create a express server in 'server/app.js'
  * prepares graphqlExpress with 'apollo-server-express' including MongoDB as context
  * this context (first argument ) will be passed down to all resolvers as 3rd argument
* add .env.[test|dev|prod] file for environment variables
  * MDB_API_KEY=<--->

## sample GraphQL Queries
```json
mutation create{
  createLink(
    url: "http://test.com"
    description: "some url"
  ){
    id
    url
  }
}
query links{
  links{
    id
    url
    description
  }
}
mutation delete{
  removeLink(id:"59ff0f31598f6017bca2be1a")
}
mutation update{
  updateLink(id:"59ff1d3d5edfe846bc2d408f", 
            url: "http://tstupd.com",
            description:"some url change")
  {
    id
    url
    description
  }
}
```