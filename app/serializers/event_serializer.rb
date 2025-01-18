class EventSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :description, :duration

  belongs_to :speaker, serializer: UserSerializer
  has_many :bookings
end
