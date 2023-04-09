export default function countConsecutiveDates(data) {
  let count = 1;

  // Get the last date in the array
  const lastDate = new Date(data[data.length - 1].dateAdded);

  // Loop through the array backwards, starting from the second to last item
  for (let i = data.length - 2; i >= 0; i--) {
    const currentDate = new Date(data[i].dateAdded);

    // Check if the current date is one day before the previous date
    if (
      currentDate.getDate() === lastDate.getDate() - 1
    ) {
      count++;
      lastDate.setTime(currentDate.getTime()); // Update lastDate to current date
    } else {
      break; // Stop looping if the dates are not consecutive
    }
  }

  return count;
}