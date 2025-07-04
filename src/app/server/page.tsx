'use client'

import React from "react";
import styles from '../../styles/primary.module.css'
import { VoiceRoom } from '../../components/voice-room'
import { useLocalCameraStream } from "hooks";

export default function Page() {
    const { localStream } = useLocalCameraStream();

    return <div className={styles.primary}>
        <VoiceRoom localStream={localStream} />
        <div>
            <div> </div>
            <div> </div>
        </div>
    </div>
}