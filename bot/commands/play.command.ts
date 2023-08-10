import {AdvancedClient} from "../discord/advancedClient";
import {SlashCommand} from "../types/slashCommand";
import {SlashCommandBuilder} from "discord.js";
import {SmartAudioPlayer} from "../utils/audio/smartAudioPlayer";
import {createDefaultMessage, createErrorMessage} from "../utils/embed";

const PlayCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a music in your channel')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('youtube url')
                .setRequired(true)
        ),
    run: async (interaction): Promise<void> => {
        if (!interaction.guild) {
            return;
        }

        const client = interaction.client;
        if (client as AdvancedClient !== null) {
            const advClient = client as AdvancedClient;

            let player = advClient.audioPlayer.get(interaction.guild.id);
            if (!player) {
                player = new SmartAudioPlayer(interaction.guild.id);
                advClient.audioPlayer.set(interaction.guild.id, player);
            }

            if (!player.joined) {
                const member = interaction.guild.members.cache.get(interaction.user.id);
                if (!member) {
                    return;
                }

                if (!member.voice.channel) {
                    throw new Error('You must be in voice chat before using the command');
                }

                player.connect(member.voice.channel);
            }

            const url = interaction.options.get('url')?.value as string;
            if (!url) {
                await interaction.reply({embeds: [createErrorMessage('The passed link is invalid')], ephemeral: false});
                return;
            }

            await player.addYouTubeTrack(url);

            if (!player.playing) {
                await player.play();
            }
            await interaction.reply({embeds: [createDefaultMessage('Track queued!', null)], ephemeral: false});
        }
    }
};

export default PlayCommand;