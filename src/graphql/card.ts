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
        t.list.field("allCards", {  
            type: "Card",

            async resolve(parent, args, context) {
               
                    const card= await context.prisma.card.findMany()

                return card
            },
        });
    },
});

