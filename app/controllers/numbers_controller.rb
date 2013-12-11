class NumbersController < ApplicationController
	def index
		@numbers = Number.all
	end

	# def create
	# 	Number.create({ number: params[:number]})
	# end
end
