import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User= objectType({
    name:"User",
    definition(t) {
        t.nonNull.int("id"),
        t.nonNull.string("name"),
        t.nonNull.string("email"),
        t.nonNull.string("password"),
        t.nonNull.list.field("cards", {    // 1
            type: "Card",
            resolve(parent, args, context) {   // 2
                return context.prisma.user  // 3
                    .findUnique({ where: { id: parent.id } })
                    .cards();
            },
        }),
        t.nonNull.list.field("categories", {    // 1
            type: "Category",
            resolve(parent, args, context) {   // 2
                return context.prisma.user  // 3
                    .findUnique({ where: { id: parent.id } })
                    .categories();
            },
        })
    },
})
