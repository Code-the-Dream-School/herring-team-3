class UserProfileSerializer
  include JSONAPI::Serializer
  attributes :name, :email, :id, :bio

  attribute :donations do |user|
    user.donations ? user.donations.map { |donation| DonationSerializer.new(donation).serializable_hash } : []
  end

  attribute :orders do |user|
    user.orders ? user.orders.map { |order| OrderSerializer.new(order).serializable_hash } : []
  end
end
