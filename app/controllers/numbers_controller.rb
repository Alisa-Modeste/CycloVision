class NumbersController < ApplicationController
	def index
		#@numbers = Number.all
		@numbers = Number.select([:id, :number, :created_at]) 

		respond_to do |format|
			format.html #render :index
			format.json { render json: @numbers }
		end
	end

	# def create
	# 	Number.create({ number: params[:number]})
	# end
end
