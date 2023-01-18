export function formatHour(date: Date) {
  let min = date.getMinutes();
  let hour = date.getHours()

  if (hour <= 9) {
    if (min <= 9) {
      return `0${hour}:0${min}`;
    }
    return `0${hour}:${min}`
  } else if (min <= 9) {
    return `${hour}:0${min}`;
  }
  return `${hour}:${min}`;
}