import {AdvancedClient} from "../discord/advancedClient";

export type AppHandler = {
    name: string;
    run: (client: AdvancedClient) => void;
};