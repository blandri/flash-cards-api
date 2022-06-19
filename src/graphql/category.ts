import { mutationType, nonNull, objectType, queryType, stringArg } from "nexus";


export const Category=objectType({
    name: "Category",
    definition(t){
        t.nonNull.int("id"),
        t.nonNull.string("name")
    }
})

export const CategoryQuery= queryType({
    definition(t) {
        t.nonNull.list.nonNull.field("allCategories",{
            type:"Category",

            async resolve(parent,args,context){
               const categories= await context.prisma.category.findMany()

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
                const {name}=args
                const newCategory= await context.prisma.category.create({
                    data:{
                        name
                    }
                })

                return newCategory
            }
        })
    },
})