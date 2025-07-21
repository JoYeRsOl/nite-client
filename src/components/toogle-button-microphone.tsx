import { ToggleButtonIcon } from '@/common'
import { ToggleButton } from './toggle-button'
import { useContext } from 'react'
import { VoiceRoomContext } from './voice-room'

export function ToggleButtonMicrophone() {
    const voiceRoomContext = useContext(VoiceRoomContext)

    const handleButtonPressed = (state: boolean) => {
        voiceRoomContext.setState({
            ...voiceRoomContext.context,
            microphoneMuted: state
        })
    }

    return <ToggleButton icon={ToggleButtonIcon.Microphone} onClick={handleButtonPressed} />
}
