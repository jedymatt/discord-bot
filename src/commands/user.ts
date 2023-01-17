import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { MongooseError } from "mongoose";
import LocationModel from "../models/Location";
import UserModel from "../models/User";
import { throwIfNotConnected } from "../services/databaseService";
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
    throwIfNotConnected();

    const discordId = interaction.user.id;


    const user = await UserModel.findOne({ discordId: discordId });

    if (user !== null) {
        interaction.reply('User already registered');
        return;
    }

    UserModel.create({
        discordId: discordId,
        username: interaction.user.username,
        level: 1,
        location: (await LocationModel.findOne({ code: 'L1' }))?._id,
    })

    interaction.reply('User created');
}
