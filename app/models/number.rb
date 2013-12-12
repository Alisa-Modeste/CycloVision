class Number < ActiveRecord::Base
  attr_accessible :number

  def self.period_record(limit, data)
  	p "here"
  	unless data
  		data = {
  			interval: 'day',
  			nextSet: 2, #find those preceeding today's time
  			includeSelf: true, #find those with today's time
  			endDate: Time.now,
  			timezoneOffset: 0,
  			offset: 0
  		}
  	end

	totals_with_timestamp = {}
	#totals = Number.sum(:number, :group=>"date_trunc('#{data[:interval]}', created_at)")

	bookend, equality = case data[:nextSet]
	when 1 
		[data[:endDate], ">="]
	when 0 
		[data[:startDate], "<="]
	when 2
		[data[:endDate], "<="]
	end

		bookend = bookend.to_i if bookend.is_a? String
		totals = Number.limit(limit).offset( data[:offset] ).where('created_at ' + equality + ' :some_time_ago', :some_time_ago  => Time.at(bookend).utc)
			.sum(:number, :group=>"date_trunc('#{data[:interval]}', created_at)")
		#startDate

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
