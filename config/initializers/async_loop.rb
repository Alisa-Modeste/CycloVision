def addNumber

	while true
		sleep 60000
		#sleep 6
		#Number.create(num: Math.random)

		p "Would have inserted a number"
	end
end

def startInsertion
	#t = Thread.new{ addNumber() }
	Thread.new{ addNumber() }
	#t.join
end

startInsertion