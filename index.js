const contacts = require("./contacts");
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

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      case "get":
        const oneContact = await contacts.getContactById(id);
        return console.log(oneContact);
      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        return console.log(newContact);
      case "remove":
        const removeContact = await contacts.removeContact(id);
        return console.log(removeContact);
      default:
        console.warn("Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

invokeAction(argv);
