class Number < ActiveRecord::Base
  attr_accessible :number

  def self.period_record(interval)
  	interval = 'day' if interval.nil?

	totals_with_timestamp = {}
	totals = Number.sum(:number, :group=>"date_trunc('#{interval}', created_at)")

	totals.each do |key, value| 

		if ["day", "month", "year"].include? interval
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
