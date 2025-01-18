class BookingSerializer
  include JSONAPI::Serializer
  attributes :id, :status, :start_time, :end_time, :created_at, :updated_at

  belongs_to :event
end
