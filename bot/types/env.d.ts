namespace NodeJS {
    interface ProcessEnv {
        BOT_TOKEN: string,
        BOT_ID: string,
        NODE_ENV: 'development' | 'production',
        EMOJI_GUILD_ID: string,
        ERROR_EMOJI: string,
        DB_CONNECTION_URI: string
    }
}