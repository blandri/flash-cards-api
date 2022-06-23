import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import { context } from "../nexus/context";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { schema } from "../nexus/schema";
import http from "http"
import express from "express"


    // const app=express()
    // const httpServer= http.createServer(app)

const server = new ApolloServer({
    schema,
    context,
    introspection: true,                                     
    plugins: [ApolloServerPluginLandingPageLocalDefault()],       // this is for normal deployment
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // add this to test queries offline, you get a playground at http://localhost:3000/.
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],   // this for adding express 
});

const port = process.env.PORT || 4000;  

// await server.start()
// server.applyMiddleware({
//     app,
// })

// await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
//   console.log(
//     `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
//   );


server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
