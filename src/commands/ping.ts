import { CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../types/discord";

export default <ICommand>{
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute: async (interaction) => {
        await interaction.reply('Pong!');
    }
}
