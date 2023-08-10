import {AppHandler} from "../types/handler";
import * as mongoose from "mongoose";

const DbConnectHandler: AppHandler = {
    name: 'Database Connect Handler',
    run: async (): Promise<void> => {
        await mongoose.connect(process.env.DB_CONNECTION_URI as string);
    }
};

export default DbConnectHandler;