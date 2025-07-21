import { io, Socket } from 'socket.io-client';

export let socket: Socket

export function connectSocket() {
    if (!socket) {
        console.log('Socket not initialized, cannot connect')
        return
    }

    if (!socket.connected) {
        socket.connect()
    }
}

export function closeSocket() {
    if (!socket) {
        return
    }

    socket.disconnect()
}

export function updateSocket(url: string) {
    socket = io(url, {
        autoConnect: false,
        extraHeaders: {
            ['ngrok-skip-browser-warning']: '123',
        }
    })

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
        console.log(`connect_error due to ${err.name}`);
        console.log(`connect_error due to ${err.stack}`);
    });
}