# flash-cards-api
 This the backend for a flash cards app where a user can register,login,create a card, sort&filter, 
 do crud operations and logout.

# Technologies used
- GraphQl
- Apollo server
- Prisma
- Nexus
- Typescript
- Bcrypt & JWT

# Scripts you can run in the root folder
`npm run dev`: This is for running the app in the development mode, after executing you visit the localhost
url given in the console.
`npm run generate`: This is for updating the schema.graphql file with new additions in models.
`npm run migrate`: This is for migrating the models from prisma to the database.
`npm run build`: This runs generate and transpiles typescript files to javascript and stores them in dist folder.
`npm run start`: This starts the server in production mode; it runs build and then executes files in dist. 