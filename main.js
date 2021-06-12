const apiKey = "292fc7b3bcaf765e5ce6b7928490eaf268c13dc1";
const url = "https://calendarific.com/api/v2/holidays?";

function urlToFetchFun(country, year) {
  return `${url}api_key=${apiKey}&country=${country}&year=${year}`;
}

const getHolidays = async (urlToFetch) => {
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const holidays = jsonResponse.response.holidays.map((holiday) => {
        obj = {
          name: holiday.name,
          date: holiday.date.iso,
        };
        function formatDate(date) {
          let year = date.getFullYear();
          let month = date.getMonth();
          let dt = date.getDate();
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Avg",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const newDate = dt + " " + monthNames[month] + " " + year;
          return newDate;
        }

        const newDate = formatDate(new Date(obj.date));
        obj.date = newDate;
        return obj;
      });

      console.log(holidays);
      return holidays;
    } else {
      throw new Error("Request Failed!");
    }
  } catch (error) {
    console.log(error);
  }
};

const createHolidaysHTML = (holiday) => {
  return `<div class="row my-4 response-data">
    <div class="col-lg-8 col-md-7 col-6">"<b>${holiday.name}</b>"</div> <div class="col-lg-4 col-md-5 col-6 text-right">${holiday.date}</div>
  </div>`;
};

function renderHolidays(holidays) {
  let holidaysContent = "";
  for (let i = 0; i < holidays.length; i++) {
    holidaysContent += createHolidaysHTML(holidays[i]);
  }

  return holidaysContent;
}

function executeSearch(executeCountry, executeYear) {
  const result = getHolidays(urlToFetchFun(executeCountry, executeYear)).then(
    (holidays) => renderHolidays(holidays)
  );
  console.log(result);
  return result;
}
