declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            GUILD_ID: string;
            ENVIRONMENT: "dev" | "debug" | "prod";
            MONGODB_URI: string;
        }
    }
}

export { };
