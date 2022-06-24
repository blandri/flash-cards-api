import { mutationType, nonNull, objectType, queryType, stringArg } from "nexus";


export const Category=objectType({
    name: "Category",
    definition(t){
        t.nonNull.int("id"),
        t.nonNull.string("name"),
        t.nonNull.list.field("cards", {  // 1
            type: "Card",
            resolve(parent,args,context){
                return context.prisma.category
                    .findUnique({ where: { id: parent.id } })
                    .cards();
            }
        }),
        t.field("user", {   // 1
            type: "User",
            resolve(parent, args, context) {  // 2
                return context.prisma.category
                    .findUnique({ where: { id: parent.id } })
                    .user();
            },
        });
    }
})

export const CategoryQuery= queryType({
    definition(t) {
        t.nonNull.list.nonNull.field("allCategories",{
            type:"Category",

            async resolve(parent,args,context){
                const {userId}=context
                if (!userId) throw new Error("Login first");
                
               const categories= await context.prisma.category.findMany({where:{
                 user:{
                    id: userId
                 }
               }})

               return categories
            }
        })
    },
})

export const CategoryMutation= mutationType({
    definition(t) {
        t.nonNull.field("createCategory",{
            type:"Category",
            args:{
                name: nonNull(stringArg())
            },

            async resolve(parent,args,context){
                const {userId}=context
                if (!userId) throw new Error("Login first");

                const {name}=args
                const newCategory= await context.prisma.category.create({
                    data:{
                        name,
                        ownerId: userId
                    }
                })

                return newCategory
            }
        })
    },
})