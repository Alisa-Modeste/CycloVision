def addNumber

	while true
		#sleep 60000
		sleep 18000
		#Number.create(num: Math.random)

		#p "Would have inserted a number"
		num = Random.new
		Number.create({ number: num.rand(0..99)})
	end
end

#t = Thread.new{ addNumber() }
Thread.new{ addNumber() }
#t.join
