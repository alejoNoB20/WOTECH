const { useState } = require("react")
import './EmergentNotification.css'
const EmergentNotification = () => {
  const [status, setStatus] = useState([])

  return (
    <div class="container">
      <div class="rectangle">
        <div class="notification-text">
          <i class="material-icons">info</i>
          <span>&nbsp;&nbsp;This is a test notification.</span>
        </div>
      </div>
    </div>
  )
}

export default EmergentNotification
