import React, { useState } from 'react';
import ActivityItem from '../components/ActivityItem.jsx';
import Button from '../components/Button.jsx';
import { FaSpinner } from 'react-icons/fa';
import useFetchActivities from '../hooks/useFetchActivities.jsx';
import { groupByDate } from '../utils/groupByDate.js';

const ActivityFeed = () => {
  const { calls, loading, handleArchive, handleItemArchive } = useFetchActivities(); // Custom hook to fetch activities
  const [isArchived, setIsArchived] = useState(false);
  const [currentTab, setCurrentTab] = useState("activity");  // State to manage the current tab (Activity or Archived)

  // Function to handle archiving all calls
  const handleArchiveToggle = (archiveStatus) => {
    setIsArchived(archiveStatus);
    handleArchive(archiveStatus, calls);
  };

  // Function to handle archiving/unarchiving a single call
  const itemArchiveHandler = (id, status) => {
    handleItemArchive(id, status);
  }

  // Filter the calls based on the current tab
  let data = calls.filter((call) => currentTab === "activity" ? !call.is_archived : call.is_archived);

  // Sort calls by date in descending order and group them by date
  const sortedCalls = data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const groupedCalls = groupByDate(sortedCalls);

  return (
    <div>
      {/* Toggle buttons for switching between Activity and Archived tabs */}
      <div className="toggle-buttons">
        <button
          className={currentTab === "activity" ? "active" : ""}
          onClick={() => setCurrentTab("activity")}
        >
          Activity
        </button>
        <button
          className={currentTab === "archived" ? "active" : ""}
          onClick={() => setCurrentTab("archived")}
        >
          Archived Calls
        </button>
      </div>
      {loading ? (
        // Show loading spinner if data is being fetched
        <div className="loading"><FaSpinner className="spinner" /></div>
      ) : (
        <>
          {Object.keys(groupedCalls).length === 0 ? (
            // Show message if there are no calls to display
            <div className="no-calls"><strong>No calls to display</strong></div>
          ) : (
            // Display grouped calls
            Object.keys(groupedCalls).map(date => (
              <div key={date} className="call-group">
                <h3 className='date-header'>{date}</h3>
                {groupedCalls[date].map(call => (
                  <ActivityItem key={call.id} call={call} handleItemArchive={itemArchiveHandler} />
                ))}
              </div>
            ))
          )}
          {/* Show archive/unarchive buttons only if there are calls */}
          {Object.keys(groupedCalls).length > 0 && (
            <div className="archive-btn">
              {currentTab === "activity" ? (
                <Button title="Archive All" onClickHandler={() => handleArchiveToggle(true)} />
              ) : (
                <Button title="Unarchive All" onClickHandler={() => handleArchiveToggle(false)} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ActivityFeed;
