export const displayCurrency = (num: number): string => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  
    return formatter.format(num);
  };

  