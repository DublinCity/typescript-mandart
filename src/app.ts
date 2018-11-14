import * as methods from 'methods';
import * as http from 'http';
import * as setPrototypeOf from 'setprototypeof';
import { httpReqResNxt } from './interface';

const Router = require('./router');
const Layer = require('./Layer');
const slice = Array.prototype.slice;

export interface IRoute {
  route(path:string): {
    [key:string]: (args: any[])=>void;
  };
  handle: httpReqResNxt;
}

type Setting = {
  [setting: string]: string;
}

export interface Iapp {
  init: () => void;
  set: (setting: string, val?: string) => Iapp;
  enabled: (setting: string) => boolean;
  lazyrouter: () => void;
  listen: () => void;
  handle: httpReqResNxt;
  
  cache: object;
  engines: object;
  settings: Setting;
  _router?: IRoute;
  [key: string]: any; // 더 좋은 방법이 없을까?
};

const app: Iapp = {
  cache : {},
  engines : {},
  settings : {},
  _router : undefined,

  init() {
    this.cache = {};
    this.engines = {};
    this.settings = {};
    this._router = undefined;
  },

  set(setting, val) {
    if(!val) {
      return this;
    }
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

  lazyrouter() {
    if(!this._router) {
        this._router = new Router({})
    }
  },
  
  listen() {
    const server = http.createServer();
    return server.listen.apply(server, arguments);
  },
  
  handle(req, res, callback) {
    const router = this._router;
    if(router) { // type guard
      router.handle(req, res);
    }
  },
};

methods.forEach(function (method: string){
  app[method] = function(path: string) {
      this.lazyrouter()

      if(this._router) {
        var route = this._router.route(path);
        route[method].apply(route, slice.call(arguments, 1));
      }
      
      return this;
  }
})
