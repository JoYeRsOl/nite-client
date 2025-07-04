"use client"

import React from "react";
import { VideoChatRoom } from "./VideoChatRoom";
import { useLocalCameraStream } from "./hooks/useLocalCameraStream";

export default function Page() {
    const { localStream } = useLocalCameraStream();

    return <VideoChatRoom localStream={localStream}></VideoChatRoom>
}