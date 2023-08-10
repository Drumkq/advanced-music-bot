import {SlashCommand} from "../types/slashCommand";
import {ActionRowBuilder, ButtonBuilder, SlashCommandBuilder} from "discord.js";
import {ButtonStyle, ComponentType} from 'discord-api-types/v10';

const PingCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('test command'),
    permissions: ['Administrator'],
    run: async (interaction): Promise<void> => {
        const btn = new ButtonBuilder()
            .setLabel('Go')
            .setCustomId('go')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents([btn]);

        const response = await interaction.reply({components: [row], ephemeral: true});

        const controller = response.createMessageComponentCollector({componentType: ComponentType.Button, time: 3_600_000});

        controller.on('collect', async i => {
            await i.update(`You clicked up on the button ${i.component.label}`);
        });
    }
};

export default PingCommand;