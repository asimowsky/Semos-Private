export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}${getOrdinalSuffix(day)} ${year}`;
};

function getOrdinalSuffix(number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const lastDigit = number % 10;
  const specialCase = number % 100 >= 11 && number % 100 <= 13;
  const suffix = suffixes[lastDigit] || suffixes[0];

  return specialCase ? "th" : suffix;
}
