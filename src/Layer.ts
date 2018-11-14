interface ILayer {
  (path: string, options: object, fn: () => {}): void;
  handle: ()=> {};
  name: string;
  params?: any;
  path?: any;
}


const Layer = <ILayer>(function(this: ILayer, path: string, options: object, fn: () => {}){
    if (!(this instanceof Layer)) {
        return new Layer(path, options, fn);
    }

    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.params = undefined;
    this.path = undefined;
})


Layer.prototype.match = function match(path: string) {
    return this.route.path === path;
};

Layer.prototype.handle_request = function handle(req,res,next) {
    var fn = this.handle;

    try {
        fn(req, res, next);
    } catch (err) {
        console.error(err)
    }
}

export default Layer;