'use client'

import { RoomProperties } from "components/room-properies";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
    const [roomName, setRoomName] = useState<string>('')
    const [serverUrl, setServerUrl] = useState<string>('localhost:3333')

    console.log('serverUrl', serverUrl)
    console.log('roomName', roomName)

    return <div>
        <h1>Welcome to Zov-client!</h1>
        <RoomProperties serverUrl={serverUrl} roomName={roomName} setServerUrl={setServerUrl} setRoomName={setRoomName} />
        <Link href={{
            pathname: '/server',
            query: {
                serverUrl,
                roomName
            }
        }} >Server</Link>
    </div>
}