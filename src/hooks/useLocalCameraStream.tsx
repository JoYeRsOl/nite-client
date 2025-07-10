import { useEffect, useState } from 'react';

export function useLocalCameraStream() {
    const [localStream, setLocalStream] = useState<MediaStream>();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                setLocalStream(stream);
            });
    }, []);

    return {
        localStream,
    };
}