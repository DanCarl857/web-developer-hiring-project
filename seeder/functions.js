const mongoose = require('mongoose');
const assert = require('assert');
const faker = require('faker');

const { User } = require('./models/User');
const { Property } = require('./models/Property');

mongoose.Promise = global.Promise;
const db = mongoose.connection;

const startConnection = (url) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  });
}

const addUser = (user) => {
    User.create(user, (err) => {
        assert.equal(null, err);
        console.info('--- Done ---');
    })
}

const addProperty = (property) => {
    Property.create(property, (err) => {
        assert.equal(null, err);
    });
}

const populateProperties = (url) => {
    User.find({})
        .exec((err, user) => {
            try {
                assert.equal(null, err);

                const enums = ['DEFECTIVE', 'NEUTRAL', 'GOOD'];

                if (user.length >= 1) {
                    // Create 100 properties for created user
                    for(let index = 0; index < 100; index++) {
                        startConnection(url);
                        let property = {
                            name: `${faker.name.firstName()}, ${faker.name.lastName()} Properties`,
                            price: faker.finance.amount(),
                            address: faker.address.streetAddress(),
                            description: faker.lorem.sentence(),
                            contact: faker.phone.phoneNumber(),
                            inspected: faker.random.boolean(),
                            inspection: JSON.stringify({
                            wiring:  Math.floor(Math.random() * 100) + 1,
                            floor: Math.floor(Math.random() * 100) + 1,
                            paint: Math.floor(Math.random() * 100) + 1,
                            roof: Math.floor(Math.random() * 100) + 1,
                            doors: Math.floor(Math.random() * 100) + 1
                            }),
                            comment: enums[Math.floor(Math.random() * 3) + 0 ],
                            rating: Math.floor(Math.random() * 100) + 1,
                            company: `${user[0]._id}` 
                        };
                        addProperty(property, url);
                    }
                }
                console.info(`Email: ${user[0].email}\nPassword: test123\n`);
                return;
            } catch (err) {
                populateProperties(url);
            }
        })
}

const populateDb = async (mongo_url) => {
    // Connect to MongoDB database
    startConnection(mongo_url);

    // Always start afresh
    db.dropDatabase();

    console.info('--- Generating data ---')
    // Generate user data
    let companyName = faker.company.companyName()
    let obj = {
        email: `${faker.name.firstName()}@gmail.com`,
        password: 'test123',
        name: companyName,
        username: faker.random.word(),
        phone: faker.phone.phoneNumber(),
    }

    // Create 1 user to represent Insurance company
    await addUser(obj);
    await populateProperties(mongo_url);
}

module.exports = { addUser, populateDb };