'use client'
import React, { useEffect, useRef, useState } from "react";
// import styles from '../styles/primary.module.css'
import styles from '../styles/voice-room.module.css'
import ToggleButton from './toggle-button'
import { ToogleButtonIcon } from '../common/toggle-button.enum'
import { updateSocket } from "app/socket";
import { useChatConnection, usePeerConnection } from "hooks";

export function VoiceRoom({ localStream }: { localStream?: MediaStream }) {
    const [roomName, setRoomName] = useState<string>('')
    const [serverUrl, setServerUrl] = useState<string>('localhost:3333')
    const [connectReady, setConnectReady] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState<boolean>(false)

    console.log('roomName', roomName)
    console.log('serverUrl', serverUrl)
    console.log('connectReady', connectReady)
    console.log('isConnected', isConnected)

    useEffect(() => {
        if (serverUrl) {
            updateSocket(serverUrl)
        }
    }, [serverUrl])

    const connectionResult = usePeerConnection({ localStream, roomName, connectReady })
    useChatConnection({ peerConnection: connectionResult.peerConnection, roomName })

    useEffect(() => {
        if (connectionResult.peerConnection) {
            const handleConnectionStateChange = () => {
                setIsConnected(connectionResult.peerConnection!.connectionState === 'connected')
            }

            connectionResult.peerConnection.addEventListener('connectionstatechange', handleConnectionStateChange)
            return () => {
                connectionResult.peerConnection?.removeEventListener('connectionstatechange', handleConnectionStateChange)
            }
        }
    }, [connectionResult.peerConnection])

    const handleConnect = () => {
        if (roomName.trim()) {
            setConnectReady(true)
        } else {
            alert('Please enter a room name')
        }
    }
    const streams = []

    if (localStream) {
        streams.push({
            mediaStream: localStream,
            isMuted: true
        })
    }

    if (connectionResult.guestStream) {
        streams.push({
            mediaStream: connectionResult.guestStream,
            isMuted: false
        })
    }

    return <div className={styles.voiceRoom}>
        <div style={{ marginBottom: '20px' }}>
            <input
                placeholder='Server URL (e.g., localhost:3333)'
                type='text'
                value={serverUrl}
                onChange={e => setServerUrl(e.currentTarget.value)}
                style={{ marginRight: '10px', padding: '8px' }}
            />
            <input
                placeholder='Room Name'
                type='text'
                value={roomName}
                onChange={e => setRoomName(e.currentTarget.value)}
                style={{ marginRight: '10px', padding: '8px' }}
            />
            <button
                type='button'
                onClick={handleConnect}
                disabled={!roomName.trim() || connectReady}
                style={{ padding: '8px 16px' }}
            >
                {connectReady ? 'Connecting...' : 'Connect'}
            </button>
        </div>
        <VideoFrame streams={streams} />
        <VoiceRoomActionBar />
    </div>
}


interface VideoFrameProps {
    streams: {
        mediaStream: MediaStream
        isMuted?: boolean
    }[]
}


function VideoFrame({ streams }: VideoFrameProps) {
    return <div className={styles.videoFrame}>
        {streams.map((stream) => (<VideoFeed mediaStream={stream.mediaStream} isMuted={stream.isMuted} />))}
    </div>
}


function VoiceRoomActionBar() {
    return <div className={styles.voiceRoomActionBar}>
        <ToogleButtonMicrophone />
        <ToogleButtonSound />
        <ToogleButtonWebcamera />
        <ToogleButtonEndCall />
    </div>
}


function VideoFeed({ mediaStream, isMuted = false }: { mediaStream: MediaStream, isMuted?: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);

    return (
        <div className={styles.videoFeed}>
            <video
                ref={videoRef}
                autoPlay={true}
                playsInline={true}
                muted={isMuted}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                }}
            />
        </div>
    );
}


function ToogleButtonMicrophone() {
    return <ToggleButton icon={ToogleButtonIcon.Microphone} />
}


function ToogleButtonSound() {
    return <ToggleButton icon={ToogleButtonIcon.Sound} />
}


function ToogleButtonWebcamera() {
    return <ToggleButton icon={ToogleButtonIcon.Camera} />
}


function ToogleButtonEndCall() {
    return <ToggleButton icon={ToogleButtonIcon.Call} />
}