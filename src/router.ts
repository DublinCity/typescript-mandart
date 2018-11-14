import * as Route from './route';
import * as Layer from './Layer';
import * as http from 'http';
import { httpReqResNxt } from './interface';
import { Iapp } from './Express';
import { IRoute } from './app';

interface IRouter extends Iapp {
  __proto__: object;
  params: object;
  _params: any[];
  stack: any[];
}

interface IProto extends IRoute {
  stack?: any;
}


const proto:IProto = (options: object = {}) => {
  const router = <IRouter>((req,res,next) => {
      router.handle(req,res,next);
  })

  router.__proto__ = proto;

  router.params = {};
  router._params = [];
  router.stack = [];

  return router;
};

proto.route = function route(path) {
  var route = new Route(path)

  var layer = new Layer(path,{},route.dispatch.bind(route))

  layer.route = route;

  this.stack.push(layer);

  return route;
};

proto.handle = function handle(req, res, out) {
  var self = this;
  var stack = self.stack;
  var layer = stack[0];
  var route = layer.route;
  route.stack[0].handle_request(req, res);
}

export default proto