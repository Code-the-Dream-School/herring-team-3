class Api::V1::BookingsController < ApplicationController
  load_and_authorize_resource

  def index
    @bookings = Booking.accessible_by(current_ability)
    render json: @bookings
  end

  def show
    render json: @booking
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.user = current_user

    if @booking.save
      BookingMailer.booking_confirmation(@booking.user, @booking).deliver_now
      BookingMailer.new_booking_notification(@booking.speaker, @booking).deliver_now
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def update
    booking = Booking.find(params[:id])
    availability = booking.availability

    if @booking.update(booking_params)
      render json: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:event_id, :availability_id, :start_time, :end_time, :location, :status)
  end
end
