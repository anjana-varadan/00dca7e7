import { Link } from 'react-router-dom';
import CallTypeIcon from './CallTypeIcon.jsx';
import { FaBoxOpen } from 'react-icons/fa';

// ActivityItem component to display individual call details
function ActivityItem({ call, handleItemArchive }) {
  // Format the call creation time to a readable string
  const formattedTime = new Date(call.created_at).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className='call-card'>
      <div>
        <Link to={`/details/${call.id}`}>
          <div className="call-item">
            <div className='call-details'>
              <div className='call-details-group'>
                <div className='call-icon'>
                  <p> <CallTypeIcon type={call.call_type} /> </p>
                </div>

                <div className='call-number'>
                  <p><strong>From:</strong> {call.from}</p>
                  <p><strong>To:</strong> {call.to}</p>
                </div>
              </div>

              <div className='call-time'>
                <p> {formattedTime}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="archive-icon" onClick={() => handleItemArchive(call.id, !call.is_archived)}>
        <FaBoxOpen style={{ color: 'blue', cursor: 'pointer' }} />
      </div>

    </div>
  );
}

export default ActivityItem;
