import { SlashCommandBuilder } from "discord.js";
import LocationModel from "../models/Location";
import UserModel from "../models/User";
import { throwIfNotConnected } from "../services/databaseService";
import { ICommand } from "../types/discord";

export default <ICommand>{
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Moves to a new location')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('The destination location\'s name or ID')
                .setRequired(true)
        ),
    execute: async (interaction) => {
        throwIfNotConnected();

        const user = await UserModel.findOne({ discordId: interaction.user.id });

        console.log(user?.location);

        if (user === null) {
            await interaction.reply('You are not registered!');
            return;
        }

        const destination = interaction.options.getString('location', true);

        const location = await LocationModel.findOne({ $or: [{ name: destination }, { code: destination }] });

        if (location === null) {
            await interaction.reply('Location not found!');
            return;
        }

        if (location.level > user.level) {
            await interaction.reply('You are not high enough level to move there!');
            return;
        }

        if (location._id.equals(user.location)) {
            await interaction.reply('You are already there!');
            return;
        }

        await user.update({ location: location._id });


        await interaction.reply(`Moved to a new location! Welcome to ${location.name}(${location.code})`);
    }
}
