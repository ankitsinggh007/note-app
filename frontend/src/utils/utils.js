export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return  date.toLocaleString('en-US', options).replace(',', '');
  }