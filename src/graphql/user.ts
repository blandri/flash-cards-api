import { extendType, nonNull, objectType, stringArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from"dotenv"

export const User= objectType({
    name:"User",
    definition(t) {
        t.nonNull.int("id"),
        t.nonNull.string("name"),
        t.nonNull.string("email"),
        t.nonNull.string("password")
    },
})
