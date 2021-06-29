import node_media_server from 'node-media-server';
import config from './config/default';

const nms = new node_media_server(config.rtmp_server);


module.exports = nms;