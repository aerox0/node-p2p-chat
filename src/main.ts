import dgram from 'dgram'
import util from 'util'

const rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
})
const question = util.promisify(rl.question).bind(rl)
const args = process.argv.slice(2)
// const port = +args[0]
// const ipaddr = args[1] || '0.0.0.0'
// const connected: string[] = []

const source = args[0].split(':')
const destination = args[1].split(':')

// const sleep = (ms: number) => {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, ms)
// 	})
// }

const cout = (msg: string) => {
	process.stdout.cursorTo(0)
	process.stdout.write(msg)
}

const sendMsg = (client: dgram.Socket, msg: string = 'hi') => {
	client.send(Buffer.from(msg), +destination[1], destination[0])
	// if (connected.length > 0) {
	// 	client.send(Buffer.from(msg), +connected[1], connected[0])
	// 	return
	// }

	// if (port) {
	// 	client.send(Buffer.from(msg), port, ipaddr)
	// }
}

const server = async (client: dgram.Socket) => {
	// if (port) {
	client.connect(+destination[1], destination[0])
	// }

	while (true) {
		const msg = await question('Write: ')
		sendMsg(client, msg)
	}
}

const main = async () => {
	const client = dgram.createSocket('udp4')

	client.on('error', (err) => {
		console.log(`server error:\n${err.stack}`)
		client.close()
	})

	// client.once('message', (_msg, rinfo) => {
	// 	connected.push(rinfo.address)
	// 	connected.push(rinfo.port + '')
	// })

	client.on('message', (msg, rinfo) => {
		cout(`anonymous: ${msg} from ${rinfo.address}:${rinfo.port}\nWrite: `)
	})

	client.on('listening', async () => {
		const address = client.address()
		console.log(`server listening ${address.address}:${address.port}`)
		await server(client)
	})

	client.bind(+source[1], source[0])
}

main().catch((err) => {
	throw err
})
