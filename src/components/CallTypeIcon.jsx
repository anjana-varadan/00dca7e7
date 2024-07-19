// CallTypeIcon component to render different icons based on call type
import { FaPhone, FaPhoneSlash, FaVoicemail } from 'react-icons/fa';

const CallTypeIcon = ({ type }) => {
  // Use a switch statement to determine which icon to render based on the call type
  switch (type) {
    case 'missed':
      return <FaPhoneSlash style={{ color: 'red' }} />; // Render a red phone slash icon for missed calls
    case 'answered':
      return <FaPhone style={{ color: 'green' }} />; // Render a green phone icon for answered calls
    case 'voicemail':
      return <FaVoicemail style={{ color: 'blue' }} />; // Render a blue voicemail icon for voicemail calls
    default:
      return null;
  }
};

export default CallTypeIcon;
