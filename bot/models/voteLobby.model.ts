import mongoose, {SchemaTypes} from "mongoose";
import {VoteActions} from "../utils/voteActions";

interface VoteLobby {
    lobbyOwnerId: string,
    targetUserId: string,
    guildId: string,
    votes: number,
    membersId: string[]
    action: VoteActions,
}

const VoteLobbySchema = new mongoose.Schema<VoteLobby>(
    {
        lobbyOwnerId: {
            required: true,
            type: SchemaTypes.String
        },
        targetUserId: {
            required: true,
            type: SchemaTypes.String
        },
        guildId: {
            required: true,
            type: SchemaTypes.String
        },
        votes: {
            required: true,
            type: SchemaTypes.Number
        },
        membersId: {
            required: true,
            type: [String]
        },
        action: {
            required: true,
            type: SchemaTypes.String
        }
    }
);

const VoteLobbyModel = mongoose.model<VoteLobby>('VoteLobbyModel', VoteLobbySchema, 'voteLobbies');

export {
    VoteLobby,
    VoteLobbySchema,
    VoteLobbyModel
};