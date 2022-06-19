//https://developers.google.com/calendar/api/v3/reference/events#resource-representations

const mockWeatherCall = {
  "location": {
      "name": "Philadelphia",
      "region": "Pennsylvania",
      "country": "United States of America",
      "lat": 39.95,
      "lon": -75.16,
      "tz_id": "America/New_York",
      "localtime_epoch": 1655603388,
      "localtime": "2022-06-18 21:49"
  },
  "current": {
      "last_updated_epoch": 1655602200,
      "last_updated": "2022-06-18 21:30",
      "temp_c": 18.9,
      "temp_f": 66,
      "is_day": 0,
      "condition": {
          "text": "Partly cloudy",
          "icon": "../../resources/images/weatherIcon.webp",
          "code": 1003
      },
      "wind_mph": 11.9,
      "wind_kph": 19.1,
      "wind_degree": 10,
      "wind_dir": "N",
      "pressure_mb": 1013,
      "pressure_in": 29.9,
      "precip_mm": 0,
      "precip_in": 0,
      "humidity": 43,
      "cloud": 25,
      "feelslike_c": 18.9,
      "feelslike_f": 66,
      "vis_km": 16,
      "vis_miles": 9,
      "uv": 5,
      "gust_mph": 17.9,
      "gust_kph": 28.8
  }
}

export default mockWeatherCall;