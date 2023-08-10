import {SlashCommand} from "../types/slashCommand";
import {SlashCommandBuilder} from "discord.js";
import {AdvancedClient} from "../discord/advancedClient";
import {createDefaultMessage} from "../utils/embed";

const StopCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the bot'),
    run: async (interaction): Promise<void> => {
        if (!interaction.guild) {
            return;
        }

        const client = interaction.client as AdvancedClient;
        if (!client) {
            throw new Error('INVALID_CLIENT');
        }

        const player = client.audioPlayer.get(interaction.guild.id);
        if (!player) {
            await interaction.reply({embeds: [createDefaultMessage('Bot isn\'t in the channel', null)], ephemeral: false});
            return;
        }

        player.stop();
        player.disconnect();

        await interaction.reply({embeds: [createDefaultMessage('The bot stopped playing tracks', null)], ephemeral: false});
    }
};

export default StopCommand;