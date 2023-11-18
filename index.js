// console.log('Hello world! (clg)')

// const { error } = require('node:console');
// const fs = require('node:fs/promises');

// (async () => {
//         const content = await fs.readFile('test.txt');
//         console.log(content.toString());
//     })();
// const fs = require('node:fs');

// fs.readFile('test.txt', ((error, data) => {
//     console.log(data.toString())
//     console.log(error)

// }))

const fn = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const getAllContacts = await fn.listContacts();
			return console.log(getAllContacts);
			break;

		case "get":
			const getById = await fn.getContactById(id);
			return console.log(getById);
			break;

		case "add":
			const addContact = await fn.addContact({ name, email, phone });
			return console.log(addContact);
			break;

		case "remove":
			const delContact = await fn.removeContact(id);
			return console.log(delContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
