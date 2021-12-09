import TextBroadcast from './broadcast';
import Server from './server';

console.log('app started');

const server = new Server();
const broadcast = new TextBroadcast(server);

broadcast.events();
