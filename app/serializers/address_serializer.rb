class AddressSerializer < ActiveModel::Serializer
  # Defines how to display the address model
  attributes :id, :street_address, :city, :state, :postal_code, :addressable_type, :addressable_id

  # Relationship
  belongs_to :addressable
end
