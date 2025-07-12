'use client'
import React, { useEffect, useRef, useState } from "react";
// import styles from '../styles/primary.module.css'
import styles from '../styles/voice-room.module.css'
import ToggleButton from './server__voice-room__toggle-button'
import { ToogleButtonIcon } from '../common/toggle-button.enum'
import { updateSocket } from "app/socket";
import { useChatConnection, usePeerConnection } from "hooks";
import { useSearchParams } from "next/navigation";

export function VoiceRoom({ localStream }: { localStream?: MediaStream }) {
    const searchParams = useSearchParams()

    const roomName = searchParams.get('roomName') || ''
    const serverUrl = searchParams.get('serverUrl') || ''

    const [isConnected, setIsConnected] = useState<boolean>(false)

    console.log('isConnected', isConnected)

    useEffect(() => {
        updateSocket(serverUrl)
    })

    const connectionResult = usePeerConnection({ localStream, roomName })
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

    return <div className={styles.voiceRoom} >
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
                className={styles.video}
                ref={videoRef}
                autoPlay={true}
                playsInline={true}
                muted={isMuted}
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