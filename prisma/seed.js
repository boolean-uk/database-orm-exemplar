const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice'
        }
    });

    console.log('Customer created', createdCustomer);

    // Add your code here

    const createdContact = await prisma.contact.create({
        data: {
            phone: '+4471718209',
            email: 'nathan@notarealemailaddress.com',
            customerId: createdCustomer.id
        }
    });

    console.log('Contact created', createdContact);

    const createdMovie = await prisma.movie.create({
        data: {
            title: 'Dodgeball',
            runtimeMins: 120
        }
    });

    console.log('Movie created', createdMovie);

    const createdScreen = await prisma.screen.create({
        data: {
            number: 1
        }
    });

    console.log('Screen created', createdScreen);

    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: new Date(),
            movieId: createdMovie.id,
            screenId: createdScreen.id
        }
    });

    console.log('Screening created', createdScreening);


    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
