import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";

export const Card = objectType({
    name: "Card", 
    definition(t) {  
        nullable
        t.nonNull.int("id"); 
        t.nonNull.string("title"); 
        t.nonNull.string("details");
    },
});

export const CardQuery = extendType({ 
    type: "Query",

    definition(t) {
        t.nonNull.list.nonNull.field("allCards", {  
            type: "Card",

            async resolve(parent, args, context) {
               
                    const card= await context.prisma.card.findMany()

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
        })
    }
})

