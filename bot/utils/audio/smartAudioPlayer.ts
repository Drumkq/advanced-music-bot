import {
    AudioPlayer,
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
    joinVoiceChannel,
    VoiceConnection,
    VoiceConnectionStatus
} from "@discordjs/voice";
import {VoiceBasedChannel} from "discord.js";
import ytpl from "ytpl";
import play from "play-dl";

export class SmartAudioPlayer {
    public readonly audioQueue: string[];
    private readonly player: AudioPlayer;
    private readonly guildId: string;

    private _joined: boolean;
    private _playing: boolean;
    get joined(): boolean {
        return this._joined;
    }

    get playing(): boolean {
        return this._playing;
    }

    constructor(guildId: string) {
        this.player = createAudioPlayer();
        this.player.on(AudioPlayerStatus.Idle, async () => {
            await this.next();
        });

        this.player.on(AudioPlayerStatus.Playing, async () => {
            this._playing = true;
        });

        this.player.on(AudioPlayerStatus.Paused, async () => {
            this._playing = false;
        });


        this.audioQueue = [];
        this.guildId = guildId;
        this._joined = false;
        this._playing = false;
    }

    public connect(voiceChannel: VoiceBasedChannel): VoiceConnection {
        let connection = getVoiceConnection(this.guildId);
        if (!connection) {
            if (!voiceChannel.guild) {
                throw new Error('INVALID_GUILD');
            }

            connection = joinVoiceChannel({
                guildId: voiceChannel.guildId,
                channelId: voiceChannel.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator
            });
        }

        connection.subscribe(this.player);
        connection.on(VoiceConnectionStatus.Disconnected, (oldState, newState) => {
            this.stop();
            connection?.destroy();
            this.audioQueue.length = 0;
            this._joined = false;
            this._playing = false;
        });

        connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
            this._joined = true;
        });

        return connection;
    }

    public disconnect() {
        getVoiceConnection(this.guildId)?.disconnect();
    }

    public async play(): Promise<void> {
        if (this.audioQueue.length > 0) {
            try {
                this.player.play(await this.createResourceFromYouTube(this.audioQueue[0]));
            } catch (e) {
                this.audioQueue.shift();
                throw e;
            }
        } else {
            this.stop();
        }
    }

    public async next(): Promise<void> {
        this.audioQueue.shift();

        await this.play();
    }

    public stop(): void {
        this.player.stop();
    }
    public flush(): void {
        this.audioQueue.length = 0;
    }

    public async addYouTubeTrack(trackUrl: string) {
        const isPlaylist = trackUrl.includes('index=') || trackUrl.includes('list=');

        if (isPlaylist) {
            const playlist = await ytpl(trackUrl);

            for (const video of playlist.items) {
                this.addAudioToQueue(video.url);
            }
        } else {
            this.addAudioToQueue(trackUrl);
        }
    }

    private addAudioToQueue(url: string) {
        this.audioQueue.push(url);
    }

    private async createResourceFromYouTube(url: string) {
        const s = await play.stream(url, {discordPlayerCompatibility: true});
        return createAudioResource(s.stream, {inputType: s.type});
    }
}