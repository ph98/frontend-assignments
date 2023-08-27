
import MessageComponent from './'
import './styles.scss';

const MessageWrapper = ({toasts}) => {
  return (
    <div className="messages-wrapper">
      {
        toasts.map(toast => (
          <MessageComponent message={toast.message} key={toast.id} type='error' />
        ))
      }
</div>)
}

export default MessageWrapper