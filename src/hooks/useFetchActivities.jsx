import { useState, useEffect } from 'react';
import { API_URL } from '../utils/AppConfig.js';

// Custom hook to fetch and manage call activities
const useFetchActivities = () => {
  const [calls, setCalls] = useState([]); // State to store calls data and loading status
  const [loading, setLoading] = useState(false);

  // useEffect to fetch activities on component mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Function to fetch activities from the API
  const fetchActivities = () => {
    setLoading(true); // Set loading state to true while fetching
    fetch(`${API_URL}/activities`)
      .then(response => response.json())
      .then(data => {
        setCalls(data); // Update calls state with fetched data
        setLoading(false); // Set loading state to false after fetching
      })
      .catch(err => {
        console.log(err);
        setLoading(false);  // Set loading state to false if there's an error
      });
  };

   // Function to handle archiving/unarchiving all calls
  const handleArchive = (is_archived, calls) => {
    setLoading(true); // Set loading state to true while updating
    const promises = calls.map(call =>
      fetch(`${API_URL}/activities/${call.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived }) // Update is_archived status
      })
    );
    Promise.all(promises).then(() => fetchActivities()); // Refetch activities after updating
  };

  // Function to handle archiving/unarchiving a single call
  const handleItemArchive = (id, is_archived) => {
    setLoading(true); // Set loading state to true while updating
    fetch(`${API_URL}/activities/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_archived }) // Update is_archived status
    }).then(() => {
      setLoading(false)
      fetchActivities(); // Refetch activities after updating
    });
  }

  // Return state and functions to be used in components
  return { calls, loading, handleArchive, fetchActivities, handleItemArchive };
};

export default useFetchActivities;
