import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import mongoose, { MongooseError } from "mongoose";
import User from "../models/User";
import { ICommand } from "../types/discord";

export default <ICommand>{
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('User command')
        .addSubcommand(subcommand =>
            subcommand.setName('register')
                .setDescription('Register a new user')
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand(true);
        switch (subcommand) {
            case 'register':
                registerSubcommand(interaction);
                break;
        }
    }
}


async function registerSubcommand(interaction: ChatInputCommandInteraction) {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.");

    const discordId = interaction.user.id;

    const user = await User.findOne({ discordId: discordId });

    if (user) {
        interaction.reply('User already exists');
        return;
    }

    const newUser = new User({
        discordId: discordId,
        username: interaction.user.username,
    });

    newUser.save();

    interaction.reply('User created');
}
