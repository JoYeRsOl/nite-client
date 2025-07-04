
import { io, Socket } from 'socket.io-client';

export let socket: Socket

export function connectSocket() {
    if (!socket) {
        console.log('TRY CONNECT EMPTY SOCKET')
        return
    }

    socket = socket.connect()
}

export function updateSocket(url: string) {
    socket = io(url, {
        autoConnect: false,
    })

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
        console.log(`connect_error due to ${err.name}`);
        console.log(`connect_error due to ${err.stack}`);
    });
}