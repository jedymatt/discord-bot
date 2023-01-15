import { BotClient } from './botClient';
import database from './database';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is not defined');
if (!process.env.GUILD_ID) throw new Error('GUILD_ID is not defined');
if (!process.env.ENVIRONMENT) throw new Error('ENVIRONMENT is not defined');
if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not defined');

database.connect()


const client = new BotClient();

client.start();
