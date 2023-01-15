import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../types/discord";

export default <ICommand>{
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Shows your character profile'),
    execute(interaction) {
        interaction.reply('Profile command');
    },
}
