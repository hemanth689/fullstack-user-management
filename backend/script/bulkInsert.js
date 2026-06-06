import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import sequelize from '../config/database.js';

try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
    await sequelize.sync({ alter: true });
} catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
}

const insertFakeUsers = async() => {
    const fakeUsers = [];

    for (let i = 0; i < 149; i++) {
        const username = faker.internet.userName({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        });
        const email = faker.internet.email();
        const password = faker.internet.password();
        const hashedPassword = await bcrypt.hash(password, 10);
        const phoneNo = faker.phone.number();

        fakeUsers.push({
            username: username,
            email: email,
            phoneNo: phoneNo,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    try {
        await User.bulkCreate(fakeUsers);
        console.log('149 users inserted successfully via Sequelize!');
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};

insertFakeUsers();