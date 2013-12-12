class NumbersController < ApplicationController
	def index
		#@numbers = Number.all

		#time = Time.at params[:timecode]
		#time = time.utc
		#@numbers = Number.select([:id, :number, :created_at]) 


		case params[:interval]
		when "min" 
			@numbers = Number.all 
		when "hour" 
			@numbers = Number.all 
		when "month" 
			@numbers = Number.all 
		when "year" 
			@numbers = Number.all 
		else
			#day
			@numbers = Number.all 
		end

		respond_to do |format|
			format.html #render :index
			format.json { render json: @numbers }
		end
	end

	# def create
	# 	Number.create({ number: params[:number]})
	# end
end
