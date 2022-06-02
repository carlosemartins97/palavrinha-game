export function formatHour(date: Date) {
  let min = date.getMinutes();
  let hour = date.getHours()

  if(hour <= 9) {
    if(min === 0) {
      return `0${hour}:${min}0`;
    }
    return `0${hour}:${min}`
  } else if(min === 0) {
    return `${hour}:${min}0`;
  }
  return `${hour}:${min}`;
}