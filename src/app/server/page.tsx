'use client'

import React from "react"
import styles from '../../styles/server-page.module.css'
import { VoiceRoom } from '../../components/server__voice-room'
import { useLocalCameraStream } from "hooks"

export default function Page() {
    const { localStream } = useLocalCameraStream();

    return <div className={styles.container}>
        <div className={styles.server}>
            <VoiceRoom localStream={localStream} />
        </div>
    </div>

}