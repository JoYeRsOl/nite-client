import { useMemo, useState } from 'react';
import { socket } from '../socket';

export function usePeerConnection(props: { localStream: MediaStream, roomName?: string }) {
    const { roomName, localStream } = props;

    const [guestStream, setGuestStream] = useState<MediaStream>();

    const peerConnection = useMemo(() => {
        const connection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }],
        });

        connection.addEventListener('icecandidate', ({ candidate }) => {
            socket.emit('send_candidate', { candidate, roomName });
        });

        connection.addEventListener('track', ({ streams }) => {
            setGuestStream(streams[0]);
        });

        localStream.getTracks().forEach((track) => {
            connection.addTrack(track, localStream);
        });

        connection.addTransceiver('video', { direction: 'sendrecv' })
        connection.addTransceiver('audio', { direction: 'sendrecv' })

        return connection;
    }, [localStream, roomName]);

    return {
        peerConnection,
        guestStream,
    };
}