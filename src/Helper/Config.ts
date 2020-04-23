import { ConfigDto } from "../Models/System";

const ConfigFile = require('../Config.json');

class ConfigHelper {
    private _config: ConfigDto = {
        AppName: '',
        AppTitle: ''
    };

    constructor() {
        this._config = ConfigFile;
    }

    public GetConfig() {
        return this._config;
    }

    get AppTitle() {
        return this._config.AppTitle;
    }

    get AppName() {
        return this._config.AppName;
    }
}

export const Config = new ConfigHelper();