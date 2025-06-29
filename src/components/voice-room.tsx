import React from "react";
// import styles from '../styles/primary.module.css'
import styles from '../styles/voice-room.module.css'
import ToggleButton from './toggle-button'
import { ToogleButtonIcon } from '../common/toggle-button.enum'

export function VoiceRoom() {
    return <div className={styles.voiceRoom}>
        <VideoFrame/>
        <VoiceRoomActionBar/>
    </div>
}


function VideoFrame() {
    return <div className={styles.videoFrame}>
        <VideoFeed/>
        <VideoFeed/>
    </div>
}


function VoiceRoomActionBar() {
    return <div className={styles.voiceRoomActionBar}>
        <ToogleButtonMicrophone/>
        <ToogleButtonSound/>
        <ToogleButtonWebcamera/>
        <ToogleButtonEndCall/>
    </div>
}


function VideoFeed() {
    return <div className={styles.videoFeed}>

    </div>
}


function ToogleButtonMicrophone() {
    return <ToggleButton icon = {ToogleButtonIcon.Microphone}/>
}


function ToogleButtonSound() {
    return <ToggleButton icon = {ToogleButtonIcon.Sound}/>
}


function ToogleButtonWebcamera() {
    return <ToggleButton icon = {ToogleButtonIcon.Camera}/>
}


function ToogleButtonEndCall() {
    return <ToggleButton icon = {ToogleButtonIcon.Call}/>
}