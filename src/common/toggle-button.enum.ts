export enum ToggleButtonIcon {
    Call = 'Call',
    Camera = 'Camera',
    Microphone = 'Microphone',
    Sound = 'Sound',
}

export const toggleButtonOffIconMap: Record<ToggleButtonIcon, string> = {
    [ToggleButtonIcon.Call]: './icon/voiceroom-call-off.svg',
    [ToggleButtonIcon.Camera]: './icon/voiceroom-camera-off.svg',
    [ToggleButtonIcon.Microphone]: './icon/voiceroom-microphone-off.svg',
    [ToggleButtonIcon.Sound]: './icon/voiceroom-sound-off.svg',
}

export const toggleButtonOnIconMap: Record<ToggleButtonIcon, string> = {
    [ToggleButtonIcon.Call]: './icon/voiceroom-call-on.svg',
    [ToggleButtonIcon.Camera]: './icon/voiceroom-camera-on.svg',
    [ToggleButtonIcon.Microphone]: './icon/voiceroom-microphone-on.svg',
    [ToggleButtonIcon.Sound]: './icon/voiceroom-sound-on.svg',
}

