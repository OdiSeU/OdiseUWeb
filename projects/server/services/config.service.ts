import Env from './env.service';

interface IConfig {
    readonly SERVER_HOST: string;
    readonly SERVER_PORT: string;
    readonly MONGODB_URL: string;
    readonly MONGODB_NAME: string;
    readonly GSI_CLIENT_ID: string;
}

const Config: IConfig = {
    "SERVER_HOST": Env.get('SERVER_HOST'),
    "SERVER_PORT": Env.get('SERVER_PORT'),
    "MONGODB_URL": Env.get('MONGODB_URL'),
    "MONGODB_NAME": Env.get('MONGODB_NAME'),
    "GSI_CLIENT_ID": Env.get('GSI_CLIENT_ID'),
};

export default Config;