import { ApplicationCommandDataResolvable, Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";
import { ICommand } from "./types/discord";


export class BotClient extends Client {
    commands: Collection<string, ICommand> = new Collection();
    constructor() {
        super({
            intents: [
                GatewayIntentBits.GuildMessages,
            ],
        });
    }

    start() {
        this.registerCommands();
        this.registerListeners();
        this.login(process.env.BOT_TOKEN);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];

        const commandsDir = path.join(__dirname, 'commands');

        readdirSync(commandsDir).forEach(async file => {
            const filePath = path.join(commandsDir, file);

            const command = await this.importFile(filePath) as ICommand;
            if (!command?.data) return;

            this.commands.set(command.data.name, command);
            slashCommands.push(command.data);
        });

        this.on(Events.ClientReady, () => {
            if (process.env.ENVIRONMENT !== 'prod') {
                this.guilds.cache.get(process.env.GUILD_ID as string)?.commands.set(slashCommands);
                console.log('Slash commands registered in dev environment');
            } else {
                this.application?.commands.set(slashCommands);
                console.log('Slash commands registered in prod environment');
            }
        });
    }

    registerListeners() {
        ready(this);
        interactionCreate(this);
    }
}
