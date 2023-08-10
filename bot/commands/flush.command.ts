import {AdvancedClient} from "../discord/advancedClient";
import {SlashCommand} from "../types/slashCommand";
import {SlashCommandBuilder} from "discord.js";
import {SmartAudioPlayer} from "../utils/audio/smartAudioPlayer";
import {createDefaultMessage} from "../utils/embed";

const PlayCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('resets the audio player'),
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

            player.flush();
            await interaction.reply({embeds: [createDefaultMessage('Audio queue clear!', null)], ephemeral: false});
        }
    }
};

export default PlayCommand;