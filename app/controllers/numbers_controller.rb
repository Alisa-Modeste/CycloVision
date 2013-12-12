class NumbersController < ApplicationController
	def index
		@numbers = Number.period_record(params[:interval])

		respond_to do |format|
			format.html #render :index
			format.json { render json: @numbers }
		end
	end

end
