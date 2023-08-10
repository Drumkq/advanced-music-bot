import {AppHandler} from "../types/handler";
import {ActivityType} from 'discord-api-types/v10';

const ConnectedHandler: AppHandler = {
    name: 'Connected Handler',
    run: (client): void => {
        client.on('ready', async () => {
            console.log('Bot is ready!');

            await client.user?.setActivity({name: '/help', type: ActivityType.Listening});
        });
    }
};

export default ConnectedHandler;