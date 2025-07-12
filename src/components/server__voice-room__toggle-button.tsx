'use client'

import styles from '../styles/voice-room__toggle-button.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ToogleButtonIcon, toggleButtonOffIconMap, toggleButtonOnIconMap } from '../common/toggle-button.enum'

export default function ToogleButton(props: { icon: ToogleButtonIcon }) {
    const { icon } = props
    const [buttonIcon, setIcon] = useState(toggleButtonOnIconMap[icon])
    const [state, setState] = useState(true)

    console.log(`State: ${state} icon: ${buttonIcon}`)
    useEffect(() => {
        const newIcon = state
            ? toggleButtonOffIconMap[icon ?? ToogleButtonIcon.Sound]
            : toggleButtonOnIconMap[icon ?? ToogleButtonIcon.Sound]
        setIcon(newIcon)
    }, [state])

    return <div className={styles.toggleButton} onClick={() => setState(!state)}>
    <Image src={buttonIcon} alt='pohui mne' width={24} height={24}></Image>
    </div>
}