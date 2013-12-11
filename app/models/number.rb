class Number < ActiveRecord::Base
  attr_accessible :number

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
