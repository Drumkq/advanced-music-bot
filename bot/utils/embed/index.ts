import {Colors, EmbedBuilder} from "discord.js";

const createDefaultMessage = (description: string, title: string | null): EmbedBuilder => {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(Colors.Green);
};

const createErrorMessage = (exception: string) => {
    return createDefaultMessage(`**${exception}**`, null)
        .setColor(Colors.Red);
};

export {
    createDefaultMessage,
    createErrorMessage
};