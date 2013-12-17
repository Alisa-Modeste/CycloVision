def addNumber

	while true
		num = Random.new
		Number.create({ number: num.rand(0..99)})

		sleep 10800
	end
end

Thread.new{ addNumber() }
