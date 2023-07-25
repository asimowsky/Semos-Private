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

export const formatDateToMMDDYYYY = (dateString) => {
  console.log("Input date string:", dateString);

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${month}/${day}/${year}`;

  console.log("Formatted date:", formattedDate);
  return formattedDate;
};

export const convertDateToYYYYMMDD = (dateString) => {
  const dateParts = dateString.split("/");
  const year = dateParts[2];
  const month = dateParts[0].padStart(2, "0");
  const day = dateParts[1].padStart(2, "0");
  return `${year}-${month}-${day}`;
};
