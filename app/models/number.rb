class Number < ActiveRecord::Base
  attr_accessible :number

  def as_json(*args)
  	hash = super(:only => [:number])
  	hash.merge!(created_at: self.created_at.to_i)

  end

  def self.period_record(interval = null)
 #  	case interval
	# when :min
	# 	@numbers = Number.all 
	# when :hour
	# 	@numbers = Number.all 
	# when :month
	# 	@numbers = Number.all 
	# when :year
	# 	@numbers = Number.all 
	# else
	# 	#days
	# 	@numbers = Number.all
	# end

	if interval
		Number.sum(:number, :group=>"date_trunc(#{interval}, created_at)")
	else
		Number.sum(:number, :group=>"date_trunc('day', created_at)")
	end

  end

 #  def self.get_period_end(number)
	# 	if number.created_at.min == 59
	# 		if number.created_at.hour == 23
	# 			twelve_hour_format("00:00:00")
	# 		else
	# 			twelve_hour_format("#{number.created_at.hour +1}:00:00")
	# 		end
	# 	else
	# 		twelve_hour_format("#{number.created_at.hour}:#{number.created_at.min+1}:00")
	# 	end
	# end


	# def self.twelve_hour_format(time)
	# 	time = time.split(":")
	# 	# if time.first == 00
	# 	# 	time.first = 12
	# 	# elsif time.first < 12

	# 	# time.first = time.first % 12

	# 	if time.first < "12"
	# 		time[0] = 12 if time.first == "0"
	# 		time.join(":") + " AM"
	# 	else 
	# 		time[0] = time.first.to_i % 12
	# 		time.join(":") + " PM"		
	# 	end
	# end
end
