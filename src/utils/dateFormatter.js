// Utility functions for date formatting

export const formatDate = (date) => {
  if (!date) return '';
  
  // If date is a string, convert to Date object
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  // If date is a timestamp, convert to Date object
  if (typeof date === 'number') {
    date = new Date(date);
  }
  
  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }
  
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString(undefined, options);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  // If date is a string, convert to Date object
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  // If date is a timestamp, convert to Date object
  if (typeof date === 'number') {
    date = new Date(date);
  }
  
  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }
  
  const dateOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return `${date.toLocaleDateString(undefined, dateOptions)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
};

export const formatTime = (date) => {
  if (!date) return '';
  
  // If date is a string, convert to Date object
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  // If date is a timestamp, convert to Date object
  if (typeof date === 'number') {
    date = new Date(date);
  }
  
  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }
  
  const options = {
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return date.toLocaleTimeString(undefined, options);
};

export const getRelativeTime = (date) => {
  if (!date) return '';
  
  // If date is a string, convert to Date object
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  // If date is a timestamp, convert to Date object
  if (typeof date === 'number') {
    date = new Date(date);
  }
  
  // Check if date is valid
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }
  
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};