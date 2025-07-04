"use client"

import { useCallback, useEffect } from 'react';
import { connectSocket, socket } from '../socket';
import { useOfferSending } from './useOfferSending';
import { useSendingAnswer } from './useSendingAnswer';
import { useAnswerProcessing } from './useAnswerProcessing';

export function useChatConnection(props: { peerConnection?: RTCPeerConnection, roomName?: string }) {
    const { peerConnection, roomName } = props
    console.log(`useChatConnection:${roomName}:${peerConnection}`)

    const { sendOffer } = useOfferSending({ peerConnection, roomName });

    const { handleConnectionOffer } = useSendingAnswer({ peerConnection, roomName });

    const { handleOfferAnswer } = useAnswerProcessing(peerConnection);

    const handleConnection = useCallback(() => {
        socket.emit('join_room', roomName);
    }, [roomName]);

    const handleReceiveCandidate = useCallback(
        ({ candidate }: { candidate: RTCIceCandidate }) => {
            if (!peerConnection) {
                return
            }

            peerConnection.addIceCandidate(candidate);
        },
        [peerConnection],
    );

    useEffect(() => {
        if (!socket || !peerConnection) { return }
        connectSocket()
        socket.on('answer', handleOfferAnswer);
        socket.on('send_connection_offer', handleConnectionOffer);
        socket.on('another_person_ready', sendOffer);
        socket.on('connect', handleConnection);
        socket.on('send_candidate', handleReceiveCandidate);
        return () => {
            socket.off('answer', handleOfferAnswer);
            socket.off('send_connection_offer', handleConnectionOffer);
            socket.off('another_person_ready', sendOffer);
            socket.off('connect', handleConnection);
            socket.off('send_candidate', handleReceiveCandidate);
        };
    }, [
        roomName,
        handleConnection,
        handleConnectionOffer,
        handleOfferAnswer,
        sendOffer,
        handleReceiveCandidate
    ]);
}