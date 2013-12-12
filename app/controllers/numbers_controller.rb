class NumbersController < ApplicationController
	def index
		@numbers = Number.period_record(params[:request])

# @numbers = Number.all
# 		p "yo", params[:request][:startDate] if params[:request]


		respond_to do |format|
			format.html #render :index
			format.json { render json: @numbers }
		end
	end

end
