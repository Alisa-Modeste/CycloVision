def addNumber

	while true
		num = Random.new
		Number.create({ number: num.rand(0..99)})

		sleep 18000
	end
end

#t = Thread.new{ addNumber() }
Thread.new{ addNumber() }
#t.join
