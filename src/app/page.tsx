'use client'

import React, { useState } from "react";
import { RoomProperties } from "@/components";
import styles__typography from "@/styles/typography.module.css"
import styles__main from "@/styles/main.module.css"

export default function Page() {
    const [roomName, setRoomName] = useState<string>('')
    const [serverUrl, setServerUrl] = useState<string>('localhost:3333')

    console.log('serverUrl', serverUrl)
    console.log('roomName', roomName)

    return <div className={styles__main.mainContainer}>
        <div className={styles__main.mainHeading}>
            <h2 className={styles__typography.h2}>Welcome to</h2>
            <h1 className={styles__typography.h1}>Nite client!</h1>
        </div>
        <div className={styles__main.mainInputs}>
            <RoomProperties
                serverUrl={serverUrl}
                roomName={roomName}
                setServerUrl={setServerUrl}
                setRoomName={setRoomName} />
        </div>
    </div>
}