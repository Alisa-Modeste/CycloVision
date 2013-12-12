class NumbersController < ApplicationController
	def index
		@numbers = Number.period_record(50, params[:request])

		respond_to do |format|
			format.html #render :index
			format.json { render json: @numbers }
		end
	end

end
