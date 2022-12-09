import assert from "assert";

import instant from "./main.js";

// Date used for testing: Fri Sep 09 2022 13:55:15 GMT+0000 (123 milliseconds)

const testTimestamp = 1662731715123,
	testFormat = "d D j l N S w F m M n t L Y y a A g G h H i s u e O P c r U",
	result = "09 Fri 9 Friday 5 th 4 September 09 Sep 9 30 0 2022 22 pm PM 3 15 03 15 55 15 123 Europe/Berlin +0200 +02:00 2022-09-09T13:55:15.123Z Fri, 09 Sep 2022 13:55:15 GMT 1662731715",
	resultUTC = "09 Fri 9 Friday 5 th 4 September 09 Sep 9 30 0 2022 22 pm PM 1 13 01 13 55 15 123 UTC +0000 +00:00 2022-09-09T13:55:15.123Z Fri, 09 Sep 2022 13:55:15 GMT 1662731715";

describe("Non UTC Date", () => {
	it("create as non utc", () => {
		const fullDate = instant.unixMilli(testTimestamp);

		assert.equal(fullDate.format(testFormat), result);
	});

	it("switch to non utc", () => {
		const fullDate = instant.utc.unixMilli(testTimestamp).utc(false);

		assert.equal(fullDate.format(testFormat), result);
	});
});

describe("UTC Date", () => {
	it("create as utc", () => {
		const fullDate = instant.utc.unixMilli(testTimestamp);

		assert.equal(fullDate.format(testFormat), resultUTC);
	});

	it("switch to utc", () => {
		const fullDate = instant.unixMilli(testTimestamp).utc();

		assert.equal(fullDate.format(testFormat), resultUTC);
	});
});

describe("Ago and since", () => {
	it("since", () => {
		const sinceDay = instant.ago(-123456),
			sinceMonth = instant.ago(-12345678),
			sinceMinute = instant.ago(-1234);

		assert.equal(sinceDay, "since 1 day");
		assert.equal(sinceMonth, "since 4 months");
		assert.equal(sinceMinute, "since 20 minutes");
	});

	it("ago", () => {
		const agoDay = instant.ago(123456),
			agoMonth = instant.ago(12345678),
			agoMinute = instant.ago(1234);

		assert.equal(agoDay, "1 day ago");
		assert.equal(agoMonth, "4 months ago");
		assert.equal(agoMinute, "20 minutes ago");
	});

	it("since and ago with multiplier", () => {
		const agoDay = instant.ago(3, "days"),
			agoMonth = instant.ago(1, "month"),
			sinceMinute = instant.ago(-14, "minutes");

		assert.equal(agoDay, "3 days ago");
		assert.equal(agoMonth, "1 month ago");
		assert.equal(sinceMinute, "since 14 minutes");
	});

	it("just now", () => {
		const now = instant.ago(0);

		assert.equal(now, "just now");
	});
});

describe("Locales", () => {
	it("custom locales", () => {
		instant.useLocales({
			"since": "seit",
			"minutes": "Minuten"
		});

		const sinceMinute = instant.ago(-1234);

		assert.equal(sinceMinute, "seit 20 Minuten");
	});
});
