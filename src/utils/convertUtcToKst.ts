const convertUtcToKst = (utcString: string): string => {
  const utcDate = new Date(utcString);

  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(utcDate.getTime() + kstOffset);

  const year = kstDate.getFullYear().toString().slice(2);
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export default convertUtcToKst;
