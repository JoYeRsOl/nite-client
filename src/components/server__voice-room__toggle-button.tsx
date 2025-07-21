'use client'

import styles from '@/styles/toggle-button.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ToggleButtonIcon, toggleButtonOffIconMap, toggleButtonOnIconMap } from '@/common'

export function ToggleButton(props: { icon: ToggleButtonIcon, onClick?: (state: boolean) => void }) {
    const { icon, onClick } = props

    const [buttonIcon, setIcon] = useState(toggleButtonOnIconMap[icon])
    const [state, setState] = useState(true)

    console.log(`State: ${state} icon: ${buttonIcon}`)
    useEffect(() => {
        const newIcon = state
            ? toggleButtonOffIconMap[icon ?? ToggleButtonIcon.Sound]
            : toggleButtonOnIconMap[icon ?? ToggleButtonIcon.Sound]
        setIcon(newIcon)
    }, [state])

    const handleButtonPressed = () => {
        setState(!state)
        onClick && onClick(!state)
    }

    return <div className={styles.toggleButton} onClick={handleButtonPressed}>
        <Image src={buttonIcon} alt='pohui mne' width={24} height={24}></Image>
    </div>
}