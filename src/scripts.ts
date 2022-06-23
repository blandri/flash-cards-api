import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();

async function main(){
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