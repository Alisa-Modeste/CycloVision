class NumbersController < ApplicationController
	def index
		#@numbers = Number.all

		#time = Time.at params[:timecode]
		#time = time.utc
		#@numbers = Number.select([:id, :number, :created_at]) 

		#@numbers = Number.period_record(params[:interval])
		
		#look at month and year and day
		#@numbers = Number.period_record("month")

		@numbers = Number.period_record("year")


		respond_to do |format|
			format.html #render :index
			format.json { render json: @numbers }
		end
	end

	# def create
	# 	Number.create({ number: params[:number]})
	# end
end
