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
  return (
    <span 
    className='message-component'
        style={{
            backgroundColor: types[type].backgroundColor,
            color: types[type].color,
            display: message ? 'block' :'none'
        }}
    >
        {message}
    </span>
  )
}

export default MessageComponent