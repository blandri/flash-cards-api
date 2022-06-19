import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();

async function main(){
    // const newUser= await prisma.user.create({
    //     data:{
    //         name:"landry",
    //         email:"king.com",
    //         password:"123",
    //         cards:{
    //             create:{
    //                 details: 'Fullstack tutorial for GraphQL',
    //                 title: 'testing2',
    //             }
    //         }
    //     }
    // })
    // const newLink = await prisma.card.create({
    //     data: {
    //       details: 'Fullstack tutorial for GraphQL',
    //       title: 'testing',
    //       user: {
    //         connect:{email:"landry.com"}
    //       }
    //     },
    //   })
    const allCards = await prisma.card.findMany();
    const allUsers= await prisma.user.findMany()
    console.log(allCards);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });