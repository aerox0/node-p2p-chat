"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const util_1 = __importDefault(require("util"));
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const question = util_1.default.promisify(rl.question).bind(rl);
const args = process.argv.slice(2);
const port = +args[0];
const ipaddr = args[1] || '0.0.0.0';
const connected = [];
const cout = (msg) => {
    process.stdout.cursorTo(0);
    process.stdout.write(msg);
};
const sendMsg = (client, msg = 'hi') => {
    if (connected.length > 0) {
        client.send(Buffer.from(msg), +connected[1], connected[0]);
        return;
    }
    if (port) {
        client.connect(port, ipaddr, () => {
            client.send(Buffer.from(msg), port, ipaddr);
        });
    }
};
const server = async (client) => {
    while (true) {
        const msg = await question('Write: ');
        sendMsg(client, msg);
    }
};
const main = async () => {
    const client = dgram_1.default.createSocket('udp4');
    client.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        client.close();
    });
    client.on('message', (msg, rinfo) => {
        connected.push(rinfo.address);
        connected.push(rinfo.port + '');
        cout(`anonymous: ${msg} from ${rinfo.address}:${rinfo.port}\nWrite: `);
    });
    client.on('listening', async () => {
        const address = client.address();
        console.log(`server listening ${address.address}:${address.port}`);
        await server(client);
    });
    client.bind();
};
main().catch((err) => {
    throw err;
});
//# sourceMappingURL=main.js.map