class Number < ActiveRecord::Base
  attr_accessible :number

  def self.period_record(data)

  	unless data
  		data = {
  			interval: 'day',#NOTE: default to day
  			nextSet: "same", #find those preceeding today's time
  			#includeSelf: true, #find those with today's time
  			endDate: Time.now #,
  			# timezoneOffset: 0,
  			# offset: 0
  		}
  	end
  	p "data is", data

	totals_with_timestamp = {}

	interval_away = case data[:interval]
	when "minute" then 30.minutes
	when "hour" then 24.hours
	when "day" then 30.days
	when "month" then 12.months
	when "year" then 10.years
	end

	if data[:nextSet] == "next"
		bookend = data[:endDate].to_i
		from, to = [ Time.at(bookend).utc, (Time.at(bookend).utc + interval_away) ]
		
	elsif data[:nextSet] == "previous"
		bookend = data[:startDate].to_i
		from, to = [ (Time.at(bookend).utc - interval_away), Time.at(bookend).utc ]
		
	elsif data[:nextSet] == "same"
		bookend = data[:endDate].to_i
		from, to = [ (Time.at(bookend).utc - interval_away), Time.at(bookend).utc ]
		
	else
		return false
	end

	p "I passed the return"

	totals = Number.where('created_at >= :from and created_at <= :to',
		 :from  => from,
		 :to => to
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

	totals.empty? ? { from.to_i => 0, to.to_i => 0 } : totals_with_timestamp

  end

end
