import dotenv from 'dotenv';
import path from 'path';

abstract class Env {
    private static _mode: string;

    private static readonly init = () => {
        const NODE_ENV = process.env.NODE_ENV;
        const ENV_PATH = path.join(path.resolve(), `./.env/.env.${NODE_ENV}`);

        if(NODE_ENV === undefined) {
            throw new Error(`can not get env 'NODE_ENV'`);
        }
        Env._mode = NODE_ENV;
        dotenv.config({ path: ENV_PATH });
    }

    /**
     * Get process.env.SERVER_HOST
     * @param key 
     * @returns process.env[key] 
     * @example Env.get('SERVER_HOST')
     */
    static readonly get = (key: string): string => {
        if(!Env._mode) {
            Env.init();
        }
        const value = process.env[key];
            
        if(value === undefined) {
            throw new Error(`can not get env '${key}'`);
        }
        
        return value;
    }

    static readonly isLocal = (): boolean => {
        if(!Env._mode) {
            Env.init();
        }

        return Env._mode === 'local';
    }
    
    static readonly isDev = (): boolean => {
        if(!Env._mode) {
            Env.init();
        }

        return Env._mode === 'dev';
    }

    static readonly isProd = (): boolean => {
        if(!Env._mode) {
            Env.init();
        }

        return Env._mode === 'prod';
    }
    
    public static get mode(): string {
        if(!Env._mode) {
            Env.init();
        }

        return Env._mode;
    }
}

export default Env;