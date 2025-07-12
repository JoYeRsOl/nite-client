import styles from '../styles/main__room-properties.module.css'
import Link from "next/link"

export function RoomProperties(props: { serverUrl: string, roomName: string, setServerUrl: Function, setRoomName: Function }) {
    const { roomName, serverUrl, setRoomName, setServerUrl } = props
    return <div className={styles.roomProperties}>
        <input className={styles.input}
            placeholder='Server URL (e.g., localhost:3333)'
            type='text'
            value={serverUrl}
            onChange={e => setServerUrl(e.currentTarget.value)}
        />
        <input className={styles.input}
            placeholder='Room Name'
            type='text'
            value={roomName}
            onChange={e => setRoomName(e.currentTarget.value)}
        />
        <Link className={styles.link} href={{
            pathname: '/server',
            query: {
                serverUrl,
                roomName
            }
        }} >Server</Link>
    </div>
}