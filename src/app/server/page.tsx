'use client'

import React, { Suspense } from "react"
import styles from '@/styles/server-page.module.css'
import { VoiceRoom } from '@/components'
import { useLocalCameraStream } from "@/hooks";

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