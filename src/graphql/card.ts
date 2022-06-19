import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";

export const Card = objectType({
    name: "Card", 
    definition(t) {  
        nullable
        t.nonNull.int("id"); 
        t.nonNull.string("title"); 
        t.nonNull.string("details");
        t.nonNull.boolean("done");
    },
});

export const CardQuery = extendType({ 
    type: "Query",

    definition(t) {
        t.nonNull.list.nonNull.field("allCards", {  
            type: "Card",

            async resolve(parent, args, context) {
               
                    const cards= await context.prisma.card.findMany()

                return cards
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
                details: nonNull(stringArg())
            },

            async resolve(parent, args, context) {    
                const { title,details } = args;  // 4
                
                const newCard= await context.prisma.card.create({
                    data:{
                        title,
                        details
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
                
                const deletedCard= await context.prisma.card.delete({
                    where:{
                        id
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

