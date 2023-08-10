import {Client, ClientOptions, Collection, REST, SlashCommandBuilder} from "discord.js";
import {SlashCommand} from "../types/slashCommand";
import {Routes} from "discord-api-types/v10";
import {AppHandler} from "../types/handler";
import * as fs from "fs";
import {SmartAudioPlayer} from "../utils/audio/smartAudioPlayer";

export class AdvancedClient extends Client {
    private readonly slashCommands: Collection<string, SlashCommand>;
    public readonly audioPlayer: Collection<string, SmartAudioPlayer>;

    constructor(options: ClientOptions) {
        super(options);

        this.slashCommands = new Collection<string, SlashCommand>();
        this.audioPlayer = new Collection<string, SmartAudioPlayer>();
    }

    public getSlashCommandsNames(): SlashCommandBuilder[] {
        return this.slashCommands.map<SlashCommandBuilder>(s => s.command);
    }

    public getSlashCommand(commandName: string): SlashCommand | undefined {
        return this.slashCommands.get(commandName);
    }

    public async start(): Promise<void> {
        this.getCommands();
        await this.registerCommands();

        this.registerHandlers();

        await this.login(process.env.BOT_TOKEN);
    }

    private getCommands(): void {
        const commandsPath = `${__dirname}\\..\\commands`;

        fs.readdirSync(commandsPath).filter(file => file.endsWith('.command.ts')).forEach(file => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command: SlashCommand = require(`${commandsPath}\\${file}`).default;
            if (!command) {
                console.warn(`[-] Failed to import ${file}`);
                return;
            }

            this.slashCommands.set(command.command.name, command);
        });
    }

    private async registerCommands(): Promise<void> {
        const discordRest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN as string);

        try {
            await discordRest.put(Routes.applicationCommands(process.env.BOT_ID as string), {body: this.slashCommands.map(command => command.command.toJSON())});
        } catch (e) {
            console.error(`[-] Invalid request: ${e}`);
        }
    }

    private registerHandlers(): void {
        const handlersPath = `${__dirname}\\..\\handlers`;

        fs.readdirSync(handlersPath).filter(file => file.endsWith('.handler.ts')).forEach(file => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const handler: AppHandler = require(`${handlersPath}/${file}`).default;
            if (!handler) {
                console.warn(`[-] Failed to import ${file}`);
                return;
            }

            handler.run(this);
        });
    }
}
