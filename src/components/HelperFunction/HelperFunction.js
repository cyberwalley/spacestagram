export const covertDateFormat = (newDate) => {
  const covertedDate = newDate.getFullYear() + '-' + (parseInt(newDate.getMonth())+1) + '-' + newDate.getDate();
     return covertedDate;
}

