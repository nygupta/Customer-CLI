const mongoose = require('mongoose');
const Customer = require('./models/customer');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost/client-cli', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

clear();

console.log(
    chalk.cyan(
        figlet.textSync('Customer-cli', {horizontalLayout: 'full'})
    )  
);


//add customer
const addCustomer = (customer) => {
    Customer.create(customer)
        .then(customer => {
        console.info('New Customer Added');
        //db.close();
    });
}

//find customer
const findCustomer = (name) => {
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`); 
            //db.close();
        });
}

//update customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({_id}, customer)
        .then(customer => {
            console.info('Customer Updated');
        });
}

//remove customer
const removeCustomer = (_id) => {
    Customer.deleteOne({_id})
        .then(customer => {
            console.info('Customer Removed');
        });
}

//list all customers
const listCustomers = () => {
    Customer.find()
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} customers`);
        });
}

//exports all methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}