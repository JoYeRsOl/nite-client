import { socket } from 'app/socket';
import { useCallback } from 'react';

export function useSendingAnswer(props: { peerConnection?: RTCPeerConnection, roomName?: string }) {
    const { peerConnection, roomName } = props

    const handleConnectionOffer = useCallback(
        async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
            if (!peerConnection || !roomName) {
                return
            }

            console.log('useSendingAnswer')
            await peerConnection.setRemoteDescription(offer);
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            socket.emit('answer', { answer, roomName });
        },
        [roomName, peerConnection],
    );

    return {
        handleConnectionOffer,
    };
}