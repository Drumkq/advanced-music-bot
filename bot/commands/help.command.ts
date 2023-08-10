import {SlashCommand} from "../types/slashCommand";
import {
    ActionRowBuilder,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from "discord.js";
import {AdvancedClient} from "../discord/advancedClient";

const HelpCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('shows all commands'),
    permissions: ['Administrator'],
    run: async (interaction): Promise<void> => {
        const client = interaction.client as AdvancedClient;
        if (!client) {
            throw new Error('INVALID_CLIENT');
        }

        const createOptionsWithCommandNames = () => {
            const options = new Array<StringSelectMenuOptionBuilder>;

            client.getSlashCommandsNames().forEach(cmd => {
                options.push(
                    new StringSelectMenuOptionBuilder()
                        .setLabel(cmd.name)
                        .setDescription(cmd.description)
                        .setValue(cmd.name)
                );
            });

            return options;
        };

        const select = new StringSelectMenuBuilder()
            .setCustomId('help')
            .setPlaceholder('Make a selection!')
            .addOptions(
                createOptionsWithCommandNames()
            );

        await interaction.reply({
            components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select)]
        });
    }
};

export default HelpCommand;