import { ToggleButtonIcon } from "@/common";
import { ToggleButton } from "./toggle-button";
import { useContext } from "react";
import { VoiceRoomContext } from "./voice-room";

export function ToggleButtonWebcamera() {
    const voiceRoomContext = useContext(VoiceRoomContext)

    const handleButtonPressed = (state: boolean) => {
        voiceRoomContext.setState({
            ...voiceRoomContext.context,
            video: state
        })
    }

    return <ToggleButton icon={ToggleButtonIcon.Camera} onClick={handleButtonPressed} />
}