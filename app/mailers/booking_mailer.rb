class BookingMailer < ApplicationMailer
  default from: "no-reply@example.com"

  def booking_confirmation(user, booking)
    @user = user
    @booking = booking
    @order = @booking.order
    mail(to: @user.email, subject: "Booking Request Confirmation")
  end

  def new_booking_notification(speaker, booking)
    @speaker = speaker
    @booking = booking
    @order = @booking.order
    mail(to: @speaker.email, subject: "New Booking Request")
  end
end
