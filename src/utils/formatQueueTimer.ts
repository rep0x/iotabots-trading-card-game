export const formatQueueTimer = (number: number) => {
  let seconds = Math.floor(number % 60);
  const minutes = Math.floor(number / 60);

  if (seconds <= 9) {
    return `${minutes}:0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};
