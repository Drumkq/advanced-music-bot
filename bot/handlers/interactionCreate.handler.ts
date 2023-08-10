import {SlashCommand} from "../types/slashCommand";
import {createErrorMessage} from "../utils/embed";
import {AppHandler} from "../types/handler";
import {Interaction} from "discord.js";

const OnInteractionCreate: AppHandler = {
    name: 'On Interaction Create',
    run: client => {
        client.on('interactionCreate', async (interaction: Interaction) => {
            if (interaction.isChatInputCommand()) {
                const command: SlashCommand | undefined = client.getSlashCommand(interaction.commandName);

                if (!command) {
                    return;
                }

                try {
                    if (!interaction.guild) {
                        await interaction.reply({embeds: [createErrorMessage(`This command only works in the guild`)]});
                        return;
                    }

                    if (command.permissions) {
                        if (!interaction.memberPermissions?.has(command.permissions)) {
                            await interaction.reply({embeds: [createErrorMessage(`Not enough permits**`)]});
                            return;
                        }
                    }

                    await command.run(interaction);
                } catch (e) {
                    await interaction.reply({embeds: [createErrorMessage(`${e}`)], ephemeral: false});
                }
            }
        });
    }
};

export default OnInteractionCreate;