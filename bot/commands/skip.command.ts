import {SlashCommand} from "../types/slashCommand";
import {SlashCommandBuilder} from "discord.js";
import {AdvancedClient} from "../discord/advancedClient";
import {createDefaultMessage} from "../utils/embed";

const SkipCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips the track'),
    run: async (interaction): Promise<void> => {
        if (!interaction.guild) {
            return;
        }

        const client = interaction.client as AdvancedClient;
        if (!client) {
            return;
        }

        const player = client.audioPlayer.get(interaction.guild.id);
        if (!player) {
            await interaction.reply({embeds: [createDefaultMessage('Bot must be in the voice chat', null)], ephemeral: false});
            return;
        }
        await player.next();

        await interaction.reply({embeds: [createDefaultMessage('Skipped!', null)], ephemeral: false});
    }
};

export default SkipCommand;