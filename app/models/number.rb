class Number < ActiveRecord::Base
  attr_accessible :number

  def self.period_record(limit, data)

  	unless data
  		data = {
  			interval: 'day',
  			nextSet: "same", #find those preceeding today's time
  			includeSelf: true, #find those with today's time
  			endDate: Time.now,
  			timezoneOffset: 0,
  			offset: 0
  		}
  	end

	totals_with_timestamp = {}

	bookend, equality = case data[:nextSet]
	when "next"
		[data[:endDate], ">="]
	when "previous"
		[data[:startDate], "<="]
	when "same"
		[data[:endDate], "<="]
	else
		return false
	end


	interval_away = case data[:interval]
	when "minute" then 30.minutes
	when "hour" then 24.hours
	when "day" then 30.days
	when "month" then 12.months
	when "year" then 10.years
	end

	some_time_ago  = Time.at(bookend).utc
	interval_away = some_time_ago - interval_away

	bookend = bookend.to_i if bookend.is_a? String
	#totals = Number.limit(limit).offset( data[:offset] ).where('created_at ' + equality + ' :some_time_ago', :some_time_ago  => Time.at(bookend).utc)
	#totals = Number.where('created_at ' + equality + ' :some_time_ago and created_at ', :some_time_ago  => Time.at(bookend).utc)
	totals = Number.where('created_at <= :some_time_ago and created_at >= :some_interval_away',
		 :some_time_ago  => some_time_ago,
		 :some_interval_away => interval_away
		 )
		.sum(:number, :group=>"date_trunc('#{data[:interval]}', created_at)")

	totals.each do |key, value| 

		if ["day", "month", "year"].include? data[:interval]
			time = key[0..-9] + "12:00:00"
			time = DateTime.strptime(time, '%Y-%m-%d %H:%M:%S').to_i
		else
			time = DateTime.strptime(key, '%Y-%m-%d %H:%M:%S').to_i
		end
		totals_with_timestamp[ time ] = value
	end

	totals_with_timestamp

  end

end
