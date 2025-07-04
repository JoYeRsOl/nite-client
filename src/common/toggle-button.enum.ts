export enum ToogleButtonIcon {
    Call = 'Call',
    Camera = 'Camera',
    Microphone = 'Microphone',
    Sound = 'Sound',
}

export const toggleButtonOffIconMap: Record<ToogleButtonIcon, string> = {
    [ToogleButtonIcon.Call]: './icon/voiceroom-call-off.svg',
    [ToogleButtonIcon.Camera]: './icon/voiceroom-camera-off.svg',
    [ToogleButtonIcon.Microphone]: './icon/voiceroom-microphone-off.svg',
    [ToogleButtonIcon.Sound]: './icon/voiceroom-sound-off.svg',
}

export const toggleButtonOnIconMap: Record<ToogleButtonIcon, string> = {
    [ToogleButtonIcon.Call]: './icon/voiceroom-call-on.svg',
    [ToogleButtonIcon.Camera]: './icon/voiceroom-camera-on.svg',
    [ToogleButtonIcon.Microphone]: './icon/voiceroom-microphone-on.svg',
    [ToogleButtonIcon.Sound]: './icon/voiceroom-sound-on.svg',
}

