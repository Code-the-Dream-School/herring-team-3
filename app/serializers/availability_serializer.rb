class AvailabilitySerializer
  include JSONAPI::Serializer
  attributes :start_time, :end_time, :speaker, presence: true
end
