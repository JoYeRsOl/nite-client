import { socket } from '@/common';
import { useCallback } from 'react';

export function useOfferSending(props: { peerConnection?: RTCPeerConnection, roomName?: string }) {
    const { peerConnection, roomName } = props

    const sendOffer = useCallback(async () => {
        if (!peerConnection || !roomName) {
            return
        }
        console.log('useOfferSending')

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('send_connection_offer', {
            roomName,
            offer,
        });
    }, [roomName, peerConnection]);

    return { sendOffer };
}