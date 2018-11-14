import * as http from 'http';

// function type
export type httpReqResNxt = (req: http.ClientRequest, res: http.ServerResponse, callback?: ()=>void) => void;