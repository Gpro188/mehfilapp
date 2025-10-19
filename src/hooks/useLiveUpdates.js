import { useEffect, useRef } from 'react';

/**
 * Custom hook to enable live updates by polling localStorage for changes
 * @param {Function} updateCallback - Function to call when updates are detected
 * @param {number} interval - Polling interval in milliseconds (default: 5000ms)
 */
const useLiveUpdates = (updateCallback, interval = 5000) => {
  const lastDataRef = useRef({});
  
  useEffect(() => {
    // Initialize with current data
    const initialData = {
      events: localStorage.getItem('events'),
      teams: localStorage.getItem('teams'),
      programs: localStorage.getItem('programs'),
      students: localStorage.getItem('students'),
      results: localStorage.getItem('results'),
    };
    lastDataRef.current = initialData;
    
    // Polling function
    const checkForUpdates = () => {
      try {
        const currentData = {
          events: localStorage.getItem('events'),
          teams: localStorage.getItem('teams'),
          programs: localStorage.getItem('programs'),
          students: localStorage.getItem('students'),
          results: localStorage.getItem('results'),
        };
        
        // Check if any data has changed
        let hasChanged = false;
        for (const key in currentData) {
          if (currentData[key] !== lastDataRef.current[key]) {
            hasChanged = true;
            break;
          }
        }
        
        // If data has changed, trigger update callback
        if (hasChanged) {
          lastDataRef.current = currentData;
          updateCallback();
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    };
    
    // Set up polling interval
    const intervalId = setInterval(checkForUpdates, interval);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [updateCallback, interval]);
};

export default useLiveUpdates;