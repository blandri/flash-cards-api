import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";

export const Card = objectType({
    name: "Card", 
    definition(t) {  
        nullable
        t.nonNull.int("id"); 
        t.nonNull.string("title"); 
        t.nonNull.string("details");
        t.nonNull.boolean("done");
        t.field("user", {   // 1
            type: "User",
            resolve(parent, args, context) {  // 2
                return context.prisma.card
                    .findUnique({ where: { id: parent.id } })
                    .user();
            },
        });
        t.nonNull.list.field("categories", {  // 1
            type: "Category",
            resolve(parent,args,context){
                return context.prisma.card
                    .findUnique({ where: { id: parent.id } })
                    .categories();
            }
        })  
    },
});

export const CardQuery = extendType({ 
    type: "Query",

    definition(t) {
        t.nonNull.list.nonNull.field("allCards", {  
            type: "Card",

            async resolve(parent, args, context) {
                const {userId}=context
                if (!userId) throw new Error("Login first");
               
                    const card= await context.prisma.card.findMany({
                        where:{
                            ownerId: userId
                        }
                    })

                return card
            },
        });
    },
});

export const CardMutation= extendType({
    type:"Mutation",

    definition(t){
        t.nonNull.field("createCard",{
            type:"Card",
            args:{
                title: nonNull(stringArg()),
                details: nonNull(stringArg()),
            },

            async resolve(parent, args, context) {    
                const { title,details } = args;  // 4

                const { userId } = context;
                
                if (!userId) throw new Error("Login first");

                
                const newCard= await context.prisma.card.create({
                    data:{
                        title,
                        details,
                        ownerId: userId,
                    }
                })
                return newCard;
            },
        }),

        t.nonNull.field("deleteCard",{
            type:"Card",
            args:{
                id: nonNull(intArg())
            },

            async resolve(parent, args, context) {    
                const { id } = args;  // 4
                const { userId } = context;

                if (!userId) throw new Error("Login first");
                
                const deletedCard= await context.prisma.card.delete({
                    where:{
                        id,
                    }
                })

                return deletedCard;
            },
        }),

        t.nonNull.field("markDone",{
            type:"Card",
            args:{
                id:nonNull(intArg())
            },

            async resolve(parent,args,context){
                const {id}=args
                const { userId } = context;

                if (!userId) throw new Error("Login first");
                
                const doneCard= await context.prisma.card.update({
                    where:{
                        id
                    },
                    data:{
                        done: true
                    }
                })

                return doneCard
            }
        })
    }
})

