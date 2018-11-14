import { httpReqResNxt } from "./interface";
import * as http from 'http';

var merge = require('merge-descriptors');
var proto = require("./app")

export interface Iapp extends httpReqResNxt {
  handle: httpReqResNxt;
  init(): void;
}

function createApplication() {
    let app = <Iapp>((req,res,next) => {
        app.handle(req,res,next)
    });

    merge(app,proto,false);

    app.init();
    return app;
}
export default createApplication;
export {
  proto as application
}
