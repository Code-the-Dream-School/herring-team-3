class UserProfileSerializer
  include JSONAPI::Serializer
  attributes :name, :email, :id, :bio, :profile_image_url, :organization_id

  attribute :events, if: Proc.new { |user, params| params[:role] == "speaker" || params[:role] == "teacher" } do |user|
    user.events ? user.events.map { |event| EventSerializer.new(event).serializable_hash } : []
  end

  attribute :availabilities, if: Proc.new { |user, params| params[:role] == "speaker" || params[:role] == "teacher" } do |user|
    user.availabilities ? user.availabilities.map { |availability| AvailabilitySerializer.new(availability).serializable_hash } : []
  end

  attribute :pending_bookings, if: Proc.new { |user, params| params[:role] == "speaker" } do |user|
    user.pending_bookings ? user.pending_bookings.map { |booking| BookingSerializer.new(booking).serializable_hash } : []
  end

  attribute :confirmed_bookings, if: Proc.new { |user, params| params[:role] == "speaker" } do |user|
    user.confirmed_bookings ? user.confirmed_bookings.map { |booking| BookingSerializer.new(booking).serializable_hash } : []
  end

  attribute :bookings, if: Proc.new { |user, params| params[:role] == "teacher" } do |user|
    user.bookings ? user.bookings.map { |booking| BookingSerializer.new(booking).serializable_hash } : []
  end

  attribute :donations do |user|
    user.donations ? user.donations.map { |donation| DonationSerializer.new(donation).serializable_hash } : []
  end

  attribute :orders, if: Proc.new { |user, params| params[:role] == "teacher" } do |user|
    user.orders ? user.orders.map { |order| OrderSerializer.new(order).serializable_hash } : []
  end

  def profile_image_url
    if @resource.profile_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(@resource.profile_image, only_path: false)
    end
  end
end
