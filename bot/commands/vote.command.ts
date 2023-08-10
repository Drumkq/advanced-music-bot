import {SlashCommand} from "../types/slashCommand";
import {SlashCommandBuilder} from "discord.js";
import {VoteLobbyModel} from "../models/voteLobby.model";
import {VoteActions} from "../utils/voteActions";
import {createDefaultMessage} from "../utils/embed";

const VoteCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('vote for mute a player')
        .addUserOption(option =>
            option
                .setRequired(true)
                .setName('target')
                .setDescription('User that will get a mute')
        )
        .addStringOption(option =>
            option
                .setRequired(true)
                .setName('choice')
                .setDescription('Vote action')
                .setChoices(
                    {
                        name: 'Mute',
                        value: VoteActions.MUTE
                    },
                    {
                        name: 'Ban',
                        value: VoteActions.BAN
                    },
                    {
                        name: 'Kick',
                        value: VoteActions.KICK
                    }
                )
        ),
    run: async (interaction): Promise<void> => {
        const targetUser = interaction.options.getUser('target');
        const choice = interaction.options.get('choice')?.value as VoteActions;
        if (!choice) {
            return;
        }

        if (targetUser == null) {
            throw new Error('Failed to find user');
        }

        if (!interaction.member) {
            throw new Error('Not a member');
        }

        const currentUser = interaction.member.user;

        if (targetUser.id === currentUser.id) {
            throw new Error('You can\'t vote for self');
        }

        const voteLobby = await VoteLobbyModel.findOne( {targetUserId: targetUser.id, action: choice, guildId: interaction.guildId});
        if (!voteLobby) {
            await VoteLobbyModel.create({
                action: choice,
                targetUserId: targetUser.id,
                votes: 1,
                membersId: [currentUser.id],
                guildId: interaction.guildId,
                lobbyOwnerId: currentUser.id
            });

            await interaction.reply({embeds: [createDefaultMessage(`**You successfully created a vote for ${targetUser} ${choice.toLowerCase().replace('_', ' ')}**`, null)]});

            return;
        }

        if (voteLobby.membersId.includes(currentUser.id)) {
            throw new Error('You already voted');
        }

        voteLobby.votes++;
        voteLobby.membersId.push(currentUser.id);
        voteLobby.save();

        await interaction.reply({embeds: [createDefaultMessage(`**You successfully voted for ${targetUser} ${choice.toLowerCase().replace('_', ' ')}**`, null)]});
    }
};

export default VoteCommand;