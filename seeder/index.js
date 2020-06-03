const program = require('commander');

// Utility functions
const { populateDb } = require('./functions');

program
    .version('0.0.1')
    .description('Simple seeder for mongodb');

program
    .command('populateDb <mongo_url>')
    .alias('pDb')
    .description('Populate database using <mongo_url>')
    .action((mongo_url) => {
        populateDb(mongo_url)
    });

program.parse(process.argv);