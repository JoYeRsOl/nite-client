import { useCallback } from 'react';

export function useAnswerProcessing(peerConnection?: RTCPeerConnection) {
    const handleOfferAnswer = useCallback(
        ({ answer }: { answer: RTCSessionDescriptionInit }) => {
            if (!peerConnection) {
                return
            }
            console.log('useAnswerProcessing')

            peerConnection.setRemoteDescription(answer);
        },
        [peerConnection],
    );

    return {
        handleOfferAnswer,
    };
}