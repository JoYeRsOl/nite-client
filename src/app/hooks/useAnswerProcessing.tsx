import { useCallback } from 'react';

export function useAnswerProcessing(peerConnection?: RTCPeerConnection) {
    const handleOfferAnswer = useCallback(
        ({ answer }: { answer: RTCSessionDescriptionInit }) => {
            if (!peerConnection) {
                return
            }

            peerConnection.setRemoteDescription(answer);
        },
        [peerConnection],
    );

    return {
        handleOfferAnswer,
    };
}