import { Client, Events } from 'discord.js';

export default (client: Client): void => {
    client.once(Events.ClientReady, (c) => {
        console.log(`Logged in as ${c.user.tag}`)
    })
}
