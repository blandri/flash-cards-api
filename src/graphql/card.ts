import { arg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from "nexus";
import { Prisma } from '@prisma/client';

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
        t.int("categoryId"); 
        // t.nonNull.list.field("category", {  // 1
        //     type: "Category",
        //     resolve(parent,args,context){
        //         return context.prisma.card
        //             .findUnique({ where: { id: parent.id } })
        //             .category();
        //     }
        // })  
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
                category: nonNull(stringArg()),
            },

            async resolve(parent, args, context) {    
                const { title,details, category } = args;  // 4

                const { userId, prisma } = context;
                
                if (!userId) throw new Error("Login first");

                const cat= await prisma.category.findUnique({
                    where:{
                        name:category
                    }
                })

                if(!cat) throw new Error("Category you choosed dont exist, you can create it first");

                const newCard= await prisma.card.create({
                    data:{
                        title,
                        details,
                        ownerId: userId,
                        categoryId: cat.id ,
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
        }),

        t.nonNull.field('updateCard', {
			type: 'Card',
			args: {
				id: nonNull(intArg()),
				title: stringArg(),
				details: stringArg(),
			},
			async resolve(parent, args, context, info) {
				const { userId } = context;
				const { id, details, title } = args;

				if (!userId) {
					throw new Error('Login first');
				}

				const card = await context.prisma.card.update({
					where: { id },
					data: {
						title: title as Prisma.StringFieldUpdateOperationsInput | undefined,
						details: details as Prisma.StringFieldUpdateOperationsInput | undefined,
					},
				});

				return card;
			},
		});

        // t.nonNull.field("readOneCard",{
        //     type:"Card",
        //     args:{
        //         id: nonNull(intArg()),
        //     },

        //     async resolve(parent,args,context){
        //         const { userId, prisma } = context;
		// 		const { id } = args;

		// 		if (!userId) {
		// 			throw new Error('Login first');
		// 		}

        //         const card= await prisma.card.findUnique({
        //             where:{
        //                 id
        //             }
        //         })

        //         return card
        //     }
        // })
    }
})

