import moment from 'moment/moment';

export const utcToLocal = (utcTimestamp) => {
  // Convert the UTC timestamp to a Moment object
  const utcMoment = moment.unix(utcTimestamp);

  // Convert the Moment object to the user's local timezone
  const localMoment = utcMoment.local();

  return localMoment.fromNow();
};

export const convertToK = (number) => {
  if (number < 1000) {
    return number;
  }

  return (number / 1000).toFixed(1) + 'k';
};
