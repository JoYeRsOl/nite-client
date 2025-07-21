'use client'

import { VideoFeed } from "./video-feed"
import styles from '@/styles/voice-room.module.css'

interface VideoFrameProps {
    streams: {
        mediaStream: MediaStream
        isMuted?: boolean
    }[]
}


export function VideoFrame(props: VideoFrameProps) {
    const { streams } = props

    return <div className={styles.videoFrame}>
        {streams.map((stream, index) => (<VideoFeed mediaStream={stream.mediaStream} isMuted={stream.isMuted} key={`video-feed-${index}`} />))}
    </div>
}
