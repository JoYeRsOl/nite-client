import { useCallback } from 'react';
import { socket } from '../socket';

export function useOfferSending(props: { peerConnection?: RTCPeerConnection, roomName?: string }) {
    const { peerConnection, roomName } = props

    const sendOffer = useCallback(async () => {
        if (!peerConnection || !roomName) {
            return
        }

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('send_connection_offer', {
            roomName,
            offer,
        });
    }, [roomName, peerConnection]);

    return { sendOffer };
}