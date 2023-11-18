const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require('nanoid')

const contactsPath = path.join(process.cwd(), 'db/contacts.json');

async function readFile() {
    const contacts = await fs.readFile(contactsPath);
    const result = JSON.parse(contacts);
    return result;
}
async function writeFile(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
    const data = await readFile();
    return data;
}

async function getContactById(contactId) {
    const data = await readFile();
    const contact = data.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [contact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
}

async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    writeFile(contacts);
    return newContact;}



module.exports = {listContacts, getContactById, removeContact, addContact}