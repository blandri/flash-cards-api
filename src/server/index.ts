import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { context } from "../nexus/context";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import "dotenv/config"

// 1
import { schema } from "../nexus/schema";
export const server = new ApolloServer({
    schema,
    context,
    introspection: true,                                     
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // add this to test queries offline, you get a playground at http://localhost:3000/.
});

const port = process.env.PORT || 3000;  
// 2
server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});