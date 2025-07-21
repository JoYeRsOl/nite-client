'use client'

import React from "react";
import styles from '../../styles/server-page.module.css'
import { VoiceRoom } from '../../components/voice-room'
import { useLocalCameraStream } from "hooks";
import { Suspense } from 'react'

export default function Page() {
    const { localStream } = useLocalCameraStream();

    return <div className={styles.container}>
        <div className={styles.server}>
            <Suspense>
                <VoiceRoom localStream={localStream} />
            </Suspense>
        </div>
    </div>

}