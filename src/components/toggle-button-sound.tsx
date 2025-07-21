import { ToggleButtonIcon } from "@/common";
import { ToggleButton } from "./toggle-button";
import { VoiceRoomContext } from "./voice-room";
import { useContext } from "react";

export function ToggleButtonSound() {
    const voiceRoomContext = useContext(VoiceRoomContext)

    const handleButtonPressed = (state: boolean) => {
        voiceRoomContext.setState({
            ...voiceRoomContext.context,
            soundMuted: state
        })
    }

    return <ToggleButton icon={ToggleButtonIcon.Sound} onClick={handleButtonPressed} />
}
