import React from "react";
import styles from '../../styles/primary.module.css'
import { VoiceRoom } from '../../components/voice-room'

export default function Page() {
    return <div className={styles.primary}>
        <VoiceRoom/>
        <div> 
            <div> </div>
            <div> </div>
        </div>
    </div>
}