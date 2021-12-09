import TextBroadcast from './broadcast';
import Server from './server';

console.log('app started');

const sse = new EventSource('http://localhost:3333/sse');
const server = new Server();
const broadcast = new TextBroadcast(server, sse);

broadcast.events();
