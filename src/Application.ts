import setPrototypeOf = require('setprototypeof')
import * as method from 'methods';
import * as http from 'http';

import Router from './router';
import Layer from './Layer';

const slice = Array.prototype.slice;

export type ClientServerNext = (req: http.ClientRequest, res: http.ServerResponse, callback: () => void) => void;
type Settings = {
  [setting: string]: string;
}

export interface Iapp {
  init():  void;
  set(setting: string, val?: string): Iapp;
  enabled(setting: string): boolean;
  listen(): void;
  handle: ClientServerNext;
  cache: object;
  engines: object;
  settings: Settings;
  _router?: object;
};

const app: Iapp = {
  cache: {},
  engines: {},
  settings: {},
  _router :undefined,
  
  init() {
    this.cache = {};
    this.engines = {};
    this.settings = {};
    this._router = undefined;
  },

  set(setting, val = "") {
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
  },

  listen() {
    var server = http.createServer();
    return server.listen.apply(server, arguments);
  },

  handle(req, res, callback) {
    var router = this._router;

    router.handle(req, res);
  },
};
