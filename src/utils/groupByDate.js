export const groupByDate = (calls) => {
    return calls.reduce((acc, call) => {
      const date = new Date(call.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      });
  
      if (!acc[date]) {
        acc[date] = [];
      }
  
      acc[date].push(call);
      return acc;
    }, {});
  };
  