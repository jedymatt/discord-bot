import { Client, Events } from 'discord.js';

export default (client: Client): void => {
    client.on(Events.ClientReady, (c) => {
        console.log(`Logged in as ${c.user.tag}`)
    })
}
