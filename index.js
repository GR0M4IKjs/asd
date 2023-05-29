const { Client, Collection } = require('discord.js');
const path = require('path');
const fs = require("fs");
const { awaitdb, connection } = require("./db.js");
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()


const client = new Client({intents: 131071});
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.selects = new Collection();
client.modals = new Collection();
client.db = connection;
client.awaitdb = awaitdb;
module.exports = client;

fs.readdirSync('./handler').forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

const dir = "./events/";
const eventsPath = path.join(path.join(process.cwd(), dir));
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.code(...args));
  } else {
    client.on(event.name, (...args) => event.code(...args));
  }
}

client.login("");

