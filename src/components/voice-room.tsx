'use client'
import React, { createContext, useEffect, useState } from "react";
import styles from '@/styles/voice-room.module.css'
import { closeSocket, updateSocket } from "@/common";
import { useChatConnection, usePeerConnection } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { ToggleButtonEndCall } from "./toggle-button-end-call";
import { ToggleButtonWebcamera } from "./toggle-button-webcamera";
import { ToggleButtonMicrophone } from "./toogle-button-microphone";
import { ToggleButtonSound } from "./toggle-button-sound";
import { VideoFrame } from "./video-frame";

interface VoiceRoomContextInterface {
    soundMuted: boolean
    microphoneMuted: boolean
    video: boolean
}

interface ContextState<T> {
    context: T
    setState: React.Dispatch<React.SetStateAction<T>>
}

export const defaultVoiceRoomContext = {
    microphoneMuted: false,
    soundMuted: false,
    video: true
}

export const VoiceRoomContext = createContext<ContextState<VoiceRoomContextInterface>>({
    context: defaultVoiceRoomContext,
    setState: () => { }
})

export function VoiceRoom({ localStream }: { localStream?: MediaStream }) {
    const [voiceRoomContext, setVoiceRoomContext] = useState<VoiceRoomContextInterface>(defaultVoiceRoomContext)

    const searchParams = useSearchParams()

    const roomName = searchParams.get('roomName') || ''
    const serverUrl = searchParams.get('serverUrl') || ''

    useEffect(() => {
        updateSocket(serverUrl)

        return () => {
            closeSocket()
        }
    })

    const connectionResult = usePeerConnection({ localStream, roomName })
    useChatConnection({ peerConnection: connectionResult.peerConnection, roomName })

    useEffect(() => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0]
            audioTrack.enabled = voiceRoomContext.microphoneMuted
        }
    }, [voiceRoomContext.microphoneMuted])

    useEffect(() => {
        if (connectionResult.guestStream) {
            const audioTrack = connectionResult.guestStream.getAudioTracks()[0]
            audioTrack.enabled = voiceRoomContext.microphoneMuted
        }
    }, [voiceRoomContext.soundMuted])

    useEffect(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0]
            videoTrack.enabled = voiceRoomContext.video
        }
    }, [voiceRoomContext.video])

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
        <VoiceRoomContext.Provider value={{ context: voiceRoomContext, setState: setVoiceRoomContext }}>
            <VideoFrame streams={streams} />
            <VoiceRoomActionBar />
        </VoiceRoomContext.Provider>
    </div>
}

function VoiceRoomActionBar() {
    return <div className={styles.voiceRoomActionBar}>
        <ToggleButtonMicrophone />
        <ToggleButtonSound />
        <ToggleButtonWebcamera />
        <ToggleButtonEndCall />
    </div>
}











