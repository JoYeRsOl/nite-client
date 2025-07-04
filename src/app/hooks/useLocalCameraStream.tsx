import { useEffect, useState } from 'react';

export function useLocalCameraStream() {
    const [localStream, setLocalStream] = useState<MediaStream>();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: { height: 100, width: 100 }, audio: true })
            .then((stream) => {
                setLocalStream(stream);
            });
    }, []);

    return {
        localStream,
    };
}