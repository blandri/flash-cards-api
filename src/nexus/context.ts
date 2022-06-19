import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface Context {    // 1
    prisma: PrismaClient;
}

export const context: Context = {   // 2
    prisma,
};

// export const context = ({ req }: { req: Request }): Context => {   // 2
//     const token =
//         req && req.headers.authorization
//             ? decodeAuthHeader(req.headers.authorization)
//             : null;

//     return {  
//         prisma,
//         userId: token?.userId, 
//     };
// };