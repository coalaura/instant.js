# Instant.js

A small package to format dates and durations.

## Installation

```bash
npm i instant.js
```

### Usage (durations)

```javascript
import instant from "instant.js";

// Either use seconds
console.log(instant.ago(12345678)); // 4 months ago
console.log(instant.ago(-1234)); // since 20 minutes

// Or specify your duration type
console.log(instant.ago(3, "days")); // 3 days ago
console.log(instant.ago(-14, "minutes")) // since 14 minutes
```

### Usage (dates)

```javascript
import instant from "instant.js";

// Format a timestamp in your timezone
const myDate = instant.unix(1670610204);

console.log(myDate.format("d.m.Y - h:i:s a P")); // 09.12.2022 - 07:23:24 pm +01:00

// Or force it to be UTC
console.log(myDate.utc().format("d.m.Y - h:i:s a P")); // 09.12.2022 - 06:23:24 pm +00:00
```

|Format Character|Description|Example returned values|
|--|--|--|
|*Day*|---|---|
|`d`|Day of the month, 2 digits with leading zeros|01 to 31|
|`D`|A textual representation of a day, three letters|Mon through Sun|
|`j`|Day of the month without leading zeros|1 to 31|
|`l` (lowercase "L")|A full textual representation of the day of the week|Sunday through Saturday|
|`N`|ISO 8601 numeric representation of the day of the week|1 (for Monday) through 7 (for Sunday)|
|`S`|English ordinal suffix for the day of the month, 2 characters|st, nd, rd or th. Works well with j|
|`w`|Numeric representation of the day of the week|0 (for Sunday) through 6 (for Saturday)|
|*Month*|---|---|
|`F`|A full textual representation of a month, such as January or March|January through December|
|`m`|Numeric representation of a month, with leading zeros|01 through 12|
|`M`|A short textual representation of a month, three letters|Jan through Dec|
|`n`|Numeric representation of a month, without leading zeros|1 through 12|
|`t`|Number of days in the given month|28 through 31|
|*Year*|---|---|
|`L`|Whether it's a leap year|1 if it is a leap year, 0 otherwise.|
|`Y`|A full numeric representation of a year, at least 4 digits, with - for years BCE.|-0055, 0787, 1999, 2003, 10191|
|`y`|A two digit representation of a year|Examples: 99 or 03|
|*Time*|---|---|
|`a`|Lowercase Ante meridiem and Post meridiem|am or pm|
|`A`|Uppercase Ante meridiem and Post meridiem|AM or PM|
|`g`|12-hour format of an hour without leading zeros|1 through 12|
|`G`|24-hour format of an hour without leading zeros|0 through 23|
|`h`|12-hour format of an hour with leading zeros|01 through 12|
|`H`|24-hour format of an hour with leading zeros|00 through 23|
|`i`|Minutes with leading zeros|00 to 59|
|`s`|Seconds with leading zeros|00 through 59|
|`u`|Milliseconds|654|
|*Timezone*|---|---|
|`e`|Timezone identifier|UTC, GMT, Atlantic/Azores|
|`O`|Difference to Greenwich time (GMT) without colon between hours and minutes|+0200|
|`P`|Difference to Greenwich time (GMT) with colon between hours and minutes|+02:00|
|*Full Date/Time*|---|---|
|`c`|ISO 8601 date|2004-02-12T15:19:21+00:00|
|`r`|RFC 2822/ RFC 5322 formatted date|Thu, 21 Dec 2000 16:01:07 +0200|
|`U`|Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)|1662731715|
