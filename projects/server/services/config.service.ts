import dotenv from 'dotenv';
import path from 'path';

const ENV_PATH = path.join(path.resolve(), `./.env/.env.${process.env.NODE_ENV}`)

dotenv.config({ path: ENV_PATH });

interface IConfig {
    readonly ENV: string;
    readonly SERVER_HOST: string;
    readonly SERVER_PORT: string;
    readonly MONGODB_URL: string;
    readonly MONGODB_NAME: string;
    readonly GSI_CLIENT_ID: string;
}

const getEnv = (key: string):string => {
    const value = process.env[key];
    
    if(value === undefined) {
        throw new Error(`can not get env '${key}'`);
    }
    
    return value;
}

const Config: IConfig = {
    "ENV": getEnv('NODE_ENV'),
    "SERVER_HOST": getEnv('SERVER_HOST'),
    "SERVER_PORT": getEnv('SERVER_PORT'),
    "MONGODB_URL": getEnv('MONGODB_URL'),
    "MONGODB_NAME": getEnv('MONGODB_NAME'),
    "GSI_CLIENT_ID": getEnv('GSI_CLIENT_ID'),
};

export default Config;