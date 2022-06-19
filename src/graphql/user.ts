import { extendType, nonNull, objectType, stringArg } from "nexus";


export const User= objectType({
    name:"User",
    definition(t) {
        t.nonNull.int("id"),
        t.nonNull.string("name"),
        t.nonNull.string("email"),
        t.nonNull.string("password")
    },
})

export const UserMutation= extendType({
    type:"Mutation",
    definition(t) {
        t.nonNull.field("signup",{
            type:"User",
            args:{
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },

            async resolve(parent,args,context){
                const {name,email,password}=args

                const newUser= await context.prisma.user.create({
                    data:{
                        name,
                        email,
                        password
                    }
                })

                return newUser
            }
        })
    },
})