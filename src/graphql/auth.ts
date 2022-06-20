import { extendType, mutationType, nonNull, objectType, stringArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as dotenv from"dotenv"
import { prisma } from "@prisma/client";
import {SECRET} from "../utils/authentication"

dotenv.config()

export const Auth= objectType({
    name:"Auth",
    definition(t) {
        t.nonNull.string("token"),
        t.nonNull.field("user", {
            type: "User",
        });
    },
})

export const AuthMutation= extendType({
    type:"Mutation",
    definition(t) {
        t.nonNull.field("signup",{
            type: "Auth",
            args:{
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },

            async resolve(parent,args,context){
                const {name,email}=args

                const password = await bcrypt.hash(args.password, 10);

                const newUser= await context.prisma.user.create({
                    data:{
                        name,
                        email,
                        password
                    }
                })

                const token= jwt.sign({id:newUser.id},SECRET)

                return {user:newUser,token}
            }
        })

        t.nonNull.field("login",{
            type:"Auth",
            args:{
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },

            async resolve(parent,args,context){
                const {email,password}=args
                const user= await context.prisma.user.findUnique({
                    where:{
                        email
                    }
                })

                if(!user) throw new Error( "You are not signed up")

                const valid = await bcrypt.compare(
                    args.password,
                    user.password,
                );
                if (!valid) {
                    throw new Error("Invalid password");
                }

                const token= jwt.sign({id:user.id},SECRET)

                return {
                    user,
                    token
                }
            }
        })
    },
})