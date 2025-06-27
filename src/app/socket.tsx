
import { io } from 'socket.io-client';
export const socket = io('https://623c-194-26-211-118.ngrok-free.app', {
    autoConnect: false,
});