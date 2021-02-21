#!/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
} = require('./index');

const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'first name: '
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'last name: '
    },
    {
        type: 'input',
        name: 'phone',
        message: 'phone: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'email: '
    },
]

//version
program 
    .version('1.0.0')
    .alias('v')
    .description('Client Management System')

/*program 
    .command('add <firstname> <lastname> <phone> <email>')
    .alias('a')
    .description('Add a Customer')
    .action((firstname, lastname, phone, email) => {
        addCustomer({firstname, lastname, phone, email});
    });
*/
//add
program 
    .command('add')
    .alias('a')
    .description('Add a Customer')
    .action(() => {
        prompt(questions).then(answer => addCustomer(answer));
    });

//find
program
    .command('find <name>')
    .alias('f')
    .description('Find the customer')
    .action(name => findCustomer(name));

//update 
program
    .command('update <_id>')
    .alias('u')
    .description('Update Customer')
    .action(_id => {
        prompt(questions).then(answer => updateCustomer(_id, answer));
    });

//remove
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a customer')
    .action(_id => removeCustomer(_id));

//list 
program
    .command('list')
    .alias('l')
    .description('List all customers')
    .action(() => listCustomers());    

program.parse(process.argv);