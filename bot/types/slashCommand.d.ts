import {CommandInteraction, PermissionResolvable, SlashCommandBuilder} from "discord.js";

export type SlashCommand = {
    command: SlashCommandBuilder | any,
    permissions?: PermissionResolvable,
    run: (interaction: CommandInteraction) => void;
}