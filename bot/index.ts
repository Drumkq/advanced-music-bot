import {IntentsBitField} from "discord.js";
import {AdvancedClient} from "./discord/advancedClient";
import {config} from 'dotenv';
config();

async function main() {
    const client = new AdvancedClient({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildIntegrations,
            IntentsBitField.Flags.GuildVoiceStates
        ]
    });

    await client.start();
}

main();
