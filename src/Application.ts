import * as method from 'methods';
import * as http from 'http';
import * as setPrototypeOf from 'setprototypeof';

const Router = require('./router');
const Layer = require('./Layer');
const slice = Array.prototype.slice;

type Tsetting = {
  [setting: string]: string;
}

export interface Iapp {
  init: () => void;
  set: (setting: string, val?: string) => Iapp;
  enabled: (setting: string) => boolean;
  
  cache?: object;
  engines?: object;
  settings?: Tsetting;
  _router?: object;
};

const app: Iapp = {
  

  init() {
    this.cache = {};
    this.engines = {};
    this.settings = {};
    this.settings = {};  
    this._router = undefined;
  },

  set(setting, val) {
    this.settings[setting] = val;

    switch (setting) {
        case 'etag':
            this.set('etag fn',"")
            break;
        case 'query parser':
            this.set('query parser fn',"")
            break
        case 'trust proxy':
            this.set('trust proxy fn',"");
            break;
    }

    return this;
  },

  enabled(setting) {
    return Boolean(this.set(setting));
  }
};
