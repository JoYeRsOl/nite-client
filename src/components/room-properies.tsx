import { MouseEventHandler } from "react"
import styles from '../styles/room-properties.module.css'


export function RoomProperties (props:{serverUrl:string, roomName: string, setServerUrl: Function, setRoomName: Function, handleConnect: MouseEventHandler<HTMLButtonElement>, connectReady: boolean}){
const {connectReady,handleConnect,roomName,serverUrl,setRoomName,setServerUrl}=props
   return <div className={styles.roomProperties}>
            <input className={styles.inputEnabled}
                placeholder='Server URL (e.g., localhost:3333)'
                type='text'
                value={serverUrl}
                onChange={e => setServerUrl(e.currentTarget.value)}
            />
            <input className={styles.inputEnabled}
                placeholder='Room Name'
                type='text'
                value={roomName}
                onChange={e => setRoomName(e.currentTarget.value)}
            />
            <button
                type='button'
                onClick={handleConnect}
                disabled={!roomName.trim() || connectReady}
                style={{ padding: '8px 16px' }}
            >
                {connectReady ? 'Connecting...' : 'Connect'}
            </button>
        </div>
}