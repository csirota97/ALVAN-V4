//https://developers.google.com/calendar/api/v3/reference/events#resource-representations

const mockCalendarCall = {
 "kind": "calendar#events",
 "etag": "\"p330ol7ukqaefg0g\"",
 "summary": "Jewish Holidays",
 "updated": "2022-06-06T17:34:19.000Z",
 "timeZone": "America/Chicago",
 "accessRole": "reader",
 "defaultReminders": [],
 "nextPageToken": "CjASLgojMjAyMTA3MTdfZDZ0MTh1N2w1aGhtbmJjbnNpbGE5OHNzbmcYqIKagcPv7wIaDwgAEgAYwLn-ja6Z-AIgASIHCAIQlaXQJA==",
 "items": [
  {
   "kind": "calendar#event",
   "etag": "\"3235829976466000\"",
   "id": "20210228_mjo7ol7r6s4na15f8tmeepi0is",
   "status": "tentative",
   "htmlLink": "https://www.google.com/calendar/event?eid=MjAyMTAyMjhfbWpvN29sN3I2czRuYTE1Zjh0bWVlcGkwaXMgZW4uanVkYWlzbSNob2xpZGF5QHY",
   "created": "2021-04-08T20:49:48.000Z",
   "updated": "2021-04-08T20:49:48.233Z",
   "summary": "Event 1",
   "creator": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "organizer": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "start": {
    "date": "2022-08-21"
   },
   "end": {
    "date": "2021-03-01"
   },
   "transparency": "transparent",
   "visibility": "public",
   "iCalUID": "20210228_mjo7ol7r6s4na15f8tmeepi0is@google.com",
   "sequence": 0,
   "eventType": "default"
  },
  {
   "kind": "calendar#event",
   "etag": "\"3235829976466000\"",
   "id": "20210328_trmpe3t24vsb8jegn8p58fepj4",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=MjAyMTAzMjhfdHJtcGUzdDI0dnNiOGplZ244cDU4ZmVwajQgZW4uanVkYWlzbSNob2xpZGF5QHY",
   "created": "2021-04-08T20:49:48.000Z",
   "updated": "2021-04-08T20:49:48.233Z",
   "summary": "Event 2",
   "creator": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "organizer": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "start": {
    "date": "2022-08-21"
   },
   "end": {
    "date": "2021-03-29"
   },
   "transparency": "transparent",
   "visibility": "public",
   "iCalUID": "20210328_trmpe3t24vsb8jegn8p58fepj4@google.com",
   "sequence": 0,
   "eventType": "default"
  },
  {
   "kind": "calendar#event",
   "etag": "\"3235829976466000\"",
   "id": "20210414_3bmlpmc3h3mae4eli4rb8ou9gk",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=MjAyMTA0MTRfM2JtbHBtYzNoM21hZTRlbGk0cmI4b3U5Z2sgZW4uanVkYWlzbSNob2xpZGF5QHY",
   "created": "2021-04-08T20:49:48.000Z",
   "updated": "2021-04-08T20:49:48.233Z",
   "summary": "Event 3",
   "creator": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "organizer": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "start": {
    "date": "2022-08-22"
   },
   "end": {
    "date": "2021-04-15"
   },
   "transparency": "transparent",
   "visibility": "public",
   "iCalUID": "20210414_3bmlpmc3h3mae4eli4rb8ou9gk@google.com",
   "sequence": 0,
   "eventType": "default"
  },
  {
   "kind": "calendar#event",
   "etag": "\"3235829976466000\"",
   "id": "20210517_kgntqgs8v830f88t2cbo4o7llk",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=MjAyMTA1MTdfa2dudHFnczh2ODMwZjg4dDJjYm80bzdsbGsgZW4uanVkYWlzbSNob2xpZGF5QHY",
   "created": "2021-04-08T20:49:48.000Z",
   "updated": "2021-04-08T20:49:48.233Z",
   "summary": "Event 4",
   "creator": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "organizer": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "start": {
    "date": "2022-08-23"
   },
   "end": {
    "date": "2021-05-18"
   },
   "transparency": "transparent",
   "visibility": "public",
   "iCalUID": "20210517_kgntqgs8v830f88t2cbo4o7llk@google.com",
   "sequence": 0,
   "eventType": "default"
  },
  {
   "kind": "calendar#event",
   "etag": "\"3235829976466000\"",
   "id": "20210717_d6t18u7l5hhmnbcnsila98ssng",
   "status": "cancelled",
   "htmlLink": "https://www.google.com/calendar/event?eid=MjAyMTA3MTdfZDZ0MTh1N2w1aGhtbmJjbnNpbGE5OHNzbmcgZW4uanVkYWlzbSNob2xpZGF5QHY",
   "created": "2021-04-08T20:49:48.000Z",
   "updated": "2021-04-08T20:49:48.233Z",
   "summary": "Event 5",
   "creator": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "organizer": {
    "email": "en.judaism#holiday@group.v.calendar.google.com",
    "displayName": "Jewish Holidays",
    "self": true
   },
   "start": {
    "date": "2022-08-23"
   },
   "end": {
    "date": "2021-07-18"
   },
   "transparency": "transparent",
   "visibility": "public",
   "iCalUID": "20210717_d6t18u7l5hhmnbcnsila98ssng@google.com",
   "sequence": 0,
   "eventType": "default"
  }
 ]
}
export default mockCalendarCall;