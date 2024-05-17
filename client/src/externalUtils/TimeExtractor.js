const TimeExtractor = ({ date }) => {
  const dateObject = new Date(date);

  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = String(minutes).padStart(2, "0");

  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
};

export default TimeExtractor;
