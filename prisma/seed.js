const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: ['query'],
});

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
              create: {
                  phone: '123123',
                  email: 'test@test.com'
              }
            }
        },
        include: {
          contact: true
        }
    });

    await prisma.screen.createMany({
      data: [
        { number: 4 },
        { number: 5 }
      ]
    })

    const createdMovie = await prisma.movie.create({
      data: {
        title: 'The Journey of a Lifetime: Cohort 5',
        runtimeMins: 1000,
        screenings: {
          create: [
            { startsAt: '2022-06-08T08:00:00.000Z', screenId: 1 },
            { startsAt: '2022-06-08T10:00:00.000Z', screenId: 2 },
          ]
        }
      },
      include: {
        screenings: true
      }
    })

    const ticket = await prisma.ticket.create({
      data: {
        customerId: 1,
        screeningId: 2
      }
    })

    console.log('Customer created', createdCustomer);
    console.log('Movie created', createdMovie);
    console.log('ticket', ticket)


    // Add your code here




    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
