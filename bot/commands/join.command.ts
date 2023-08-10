import {SlashCommand} from "../types/slashCommand";
import {SlashCommandBuilder} from "discord.js";
import {createDefaultMessage} from "../utils/embed";
import {AdvancedClient} from "../discord/advancedClient";
import {SmartAudioPlayer} from "../utils/audio/smartAudioPlayer";

const JoinCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('join')
        .setDescription('joins the bot to the channel'),
    run: async (interaction): Promise<void> => {
        if (!interaction.guild) {
            throw Error('This command only works in the guild');
        }

        const member = interaction.guild.members.cache.get(interaction.user.id);
        if (!member) {
            throw new Error('You are not a member of the guild');
        }

        const vchannel = member.voice.channel;
        if (!vchannel) {
            throw new Error('You must be in voice chat before using the command');
        }

        const client = interaction.client as AdvancedClient;
        if (!client) {
            throw new Error('INVALID_CLIENT');
        }

        let player = client.audioPlayer.get(interaction.guild.id);
        if (!player) {
            player = new SmartAudioPlayer(interaction.guild.id);
            client.audioPlayer.set(interaction.guild.id, player);
        }

        player.connect(vchannel);

        await interaction.reply({embeds: [createDefaultMessage('Waiting for your favorite music\n\nUse ``/add-track`` to add your songs!', null)], ephemeral: false});
    }
};

export default JoinCommand;