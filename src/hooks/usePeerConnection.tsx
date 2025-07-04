import { socket } from 'app/socket';
import { useMemo, useState } from 'react';

export function usePeerConnection(props: { localStream?: MediaStream, roomName?: string, connectReady: boolean }) {
    const { roomName, localStream, connectReady } = props;

    const [guestStream, setGuestStream] = useState<MediaStream>();
    const peerConnection = useMemo(() => {
        if (localStream && roomName && connectReady) {
            const connection = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun2.1.google.com:19302' }],
            });

            connection.addEventListener('icecandidate', ({ candidate }) => {
                if (candidate) {
                    socket.emit('send_candidate', { candidate, roomName });
                }
            });

            connection.addEventListener('track', ({ streams }) => {
                console.log('Received remote track:', streams);
                if (streams && streams[0]) {
                    setGuestStream(streams[0]);
                }
            });

            connection.addEventListener('connectionstatechange', () => {
                console.log('Connection state:', connection.connectionState);
            });

            connection.addEventListener('iceconnectionstatechange', () => {
                console.log('ICE connection state:', connection.iceConnectionState);
            });

            // Add local tracks to the connection
            localStream.getTracks().forEach((track) => {
                connection.addTrack(track, localStream);
            });

            return connection;
        }
        return undefined;
    }, [localStream, roomName, connectReady]);

    return {
        peerConnection,
        guestStream,
    };
}