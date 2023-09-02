import { useEffect, useState } from 'react';
import './styles.scss';

const types = {
    error : {
        backgroundColor: 'var(--color-primary-red1)',
        color: 'white'
    }
}
const MessageComponent = ({
    message, type = 'error'
}) => {
    const [activeAnimation, setActiveAnimation] = useState(false)
    useEffect(() => {
        setActiveAnimation(true)
    }, [])
    
  return (
    <span className={`message-component ${activeAnimation ?'open' : 'close'}` }
        role='alert'
        style={{
            backgroundColor: types[type].backgroundColor,
            color: types[type].color,
        }}
    >
        {message}
    </span>
  )
}

export default MessageComponent