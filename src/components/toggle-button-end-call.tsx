import { ToggleButtonIcon } from "@/common";
import { ToggleButton } from "./toggle-button";
import { useRouter } from 'next/navigation'

export function ToggleButtonEndCall() {
    const router = useRouter()

    const handleButtonPressed = () => {
        router.push('/')
    }

    return <ToggleButton icon={ToggleButtonIcon.Call} onClick={handleButtonPressed} />
}