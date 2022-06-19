import { extendType, nonNull, nullable, objectType, queryType, stringArg } from "nexus";
import { Prisma } from "@prisma/client";

export const User = objectType({
    name: "User", 
    definition(t) {  
        nullable
        t.nonNull.int("id"); 
        t.nonNull.string("email"); 
        t.nonNull.string("password");
        t.nonNull.string("name");
    },
});