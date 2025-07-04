"use client"
import { VideoFeed } from './VideoFeed';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useChatConnection } from './hooks/useChatConnection';
import { updateSocket } from './socket';
import { socket } from './socket';

interface Props {
    localStream?: MediaStream;
}

export function usePeerConnection(props: { localStream?: MediaStream, roomName?: string, connectReady: boolean }) {
    const { roomName, localStream, connectReady } = props;

    const [guestStream, setGuestStream] = useState<MediaStream>();
    const peerConnection = useMemo(() => {
        if (localStream && roomName && connectReady) {
            const connection = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun2.1.google.com:19302' }],
            });

            connection.addEventListener('icecandidate', ({ candidate }) => {
                socket.emit('send_candidate', { candidate, roomName });
            });

            connection.addEventListener('track', ({ streams }) => {
                console.log(`track ${streams}`)
                setGuestStream(streams[0]);
            });

            localStream.getTracks().forEach((track) => {
                connection.addTrack(track, localStream);
            });

            return connection;
        }
    }, [localStream, roomName, connectReady]);

    return {
        peerConnection,
        guestStream,
    };
}

export const VideoChatRoom: FunctionComponent<Props> = ({ localStream }) => {
    const [roomName, setRoomName] = useState<string | undefined>()
    const [serverUrl, setServerUrl] = useState<string | undefined>('localhost:3333')
    const [connectReady, setConnectReady] = useState<boolean>(false)
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>()
    const [guestStream, setGuestStream] = useState<MediaStream>()

    console.log('roomName', roomName)
    console.log('serverUrl', serverUrl)
    console.log('connectReady', connectReady)
    console.log('peerConnection', peerConnection)
    console.log('guestStream', guestStream)
    console.log('socket', socket)
    console.log('guestStream.getTracks', guestStream?.getTracks()[0])
    console.log('guestStream.getTracks', guestStream?.getTracks()[1])

    useEffect(() => {
        if (localStream && serverUrl) {
            updateSocket(serverUrl)
        }
    }, [connectReady])

    const connectionResult = usePeerConnection({ localStream, roomName, connectReady })

    useChatConnection({ peerConnection, roomName })

    useEffect(() => {
        if (localStream && serverUrl) {
            setPeerConnection(connectionResult.peerConnection)
        }
    }, [connectionResult.peerConnection])

    useEffect(() => {
        if (connectionResult.guestStream) {
            setGuestStream(connectionResult.guestStream)
        }
    }, [connectionResult.guestStream])

    return (
        <div>
            <input placeholder='URL' type='text' alt='localhost:3333' onChange={e => { setServerUrl(e.currentTarget.value); }} />
            <input placeholder='Room' type='text' onChange={e => { setRoomName(e.currentTarget.value); }} />
            <button type='button' onClick={() => setConnectReady(true)}></button>
            {(localStream && connectReady) && (
                <div>
                    <VideoFeed mediaStream={localStream} isMuted={true} />
                </div>
            )}
            {guestStream && (
                <div>
                    <VideoFeed mediaStream={guestStream} />
                </div>
            )}
        </div>
    );
};