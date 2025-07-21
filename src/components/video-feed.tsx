'use client'

import { useEffect, useRef } from "react";
import styles from '@/styles/voice-room.module.css'

export function VideoFeed({ mediaStream, isMuted = false }: { mediaStream: MediaStream, isMuted?: boolean }) {
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
