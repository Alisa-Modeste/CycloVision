require "spec_helper"
require "number"

describe Number do

	it "it returns timestamp and total when interval is day ending with the same set" do
		number = Number.create(number: 5)
		number.created_at = Time.at(1386669978).utc
		number.save

		number = Number.create(number: 8)
		number.created_at = Time.at(1386677178).utc
		number.save

		#second day that month

		number = Number.create(number: 7)
		number.created_at = Time.at(1387087578).utc
		number.save

		number = Number.create(number: 4)
		number.created_at = Time.at(1387134378).utc
		number.save

		time = Time.at(1387152378).utc

		data = {
  			interval: 'day',#NOTE: default to day
  			nextSet: "same", #find those preceeding today's time
  			includeSelf: true, #find those with today's time
  			endDate: time,
  			timezoneOffset: 0,
  			offset: 0
  		}

		records = Number.period_record(data)

		expect(records).to eq({1386676800 => 13, 1387108800 => 11})
	end

end