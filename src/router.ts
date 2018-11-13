var setPrototypeOf = require('setprototypeof');
var Route = require('./route');
var Layer = require('./Layer');
import { ClientServerNext } from './Application'

interface Irouter extends ClientServerNext {
  params: object;
  _params: string[];
  stack : string[];
  handle: ClientServerNext;
}

var proto = function(options: object = {}) {
    const router = ((req,res,next) => {
        router.handle(req,res,next)
    }) as Irouter;

    setPrototypeOf(router, proto)

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

export default proto;