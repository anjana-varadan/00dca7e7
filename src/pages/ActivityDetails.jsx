import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/AppConfig.js';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import CallTypeIcon from '../components/CallTypeIcon.jsx';

// ActivityDetails component to display details of a specific call
const ActivityDetails = () => {
  const [call, setCall] = useState(null); // State to store call details
  const { id } = useParams(); // Get the call ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate to previous page

  // useEffect to fetch call details on component mount or when the ID changes
  useEffect(() => {
    fetch(`${API_URL}/activities/${id}`)
      .then(response => response.json())
      .then(data => setCall(data))
  }, [id]);

  // Show loading spinner while fetching call details
  if (!call) return <div className="loading"><FaSpinner className="spinner" /></div>;
  // Format the call creation date
  const formattedDate = new Date(call.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });

  return (
    <>
      <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />

      <div className="call-item-details">
        <div className='call-item-details-icon'>
          <p><CallTypeIcon type={call.call_type} /> </p>
        </div>
        <div>
          <p><strong>From:</strong> {call.from}</p>
          <p><strong>To:</strong> {call.to}</p>
          <p><strong>Via:</strong> {call.via}</p>
          <p><strong>Direction:</strong> {call.direction}</p>
          <p><strong>Duration:</strong>{call.duration} seconds</p>
        </div>
        <div className='call-item-details-icon'>
          <p>{formattedDate}</p>
        </div>
      </div>
    </>
  );
};

export default ActivityDetails;
