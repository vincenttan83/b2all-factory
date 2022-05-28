/**
 * Convert date to fit inside <input> min / max attribute
 * input type = date
 * @param date new Date()
 * @returns string date in format ISOString with 10 character
 */
export const convertDateToInputFormat = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

/**
 * Convert datetime to fit inside <input> min / max attribute
 * input type = datetime-local
 * @param datetime new Date()
 * @returns string date in format ISOString with 16 character
 */
export const convertDatetimeToInputFormat = (datetime: Date): string => {
  return datetime.toISOString().slice(0, 16);
};

/**
 * Convert datetime to fit inside <input> min / max attribute
 * input type = time
 * @param datetime new Date()
 * @returns string date in format ISOString with 16 character
 */
export const convertTimeToInputFormat = (time: Date): string => {
  return time.toISOString().slice(11, 16);
};
