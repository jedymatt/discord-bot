import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import ready from './listeners/ready';

dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
	],
});

ready(client);

client.login(process.env.BOT_TOKEN);
