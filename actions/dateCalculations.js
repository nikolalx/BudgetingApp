
export const getWeeksAndDays = (a, b) => {
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    const diffMs = Math.abs(utcA - utcB);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    console.log("weeks: ", weeks, "days: ", days);

    return { weeks: weeks, days: days };
  };

  export const dateCalculator = (value, value2) => {
    const dateObject = {};

    const currentDate = new Date(value + "-25");
    const firstDay = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    dateObject.first = firstDay.toLocaleDateString("de-DE");

    const lastDay = new Date(value + "-25");

    dateObject.last = lastDay.toLocaleDateString("de-DE");

    const { weeks, days } = getWeeksAndDays(lastDay, firstDay);

    dateObject.weeks = weeks;
    dateObject.days = days;

    return dateObject;
  };