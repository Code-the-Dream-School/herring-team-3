class UserSerializer
  # Defines how to display the user model, uses JSONAPI because it is required by my Devise implementation.
  include JSONAPI::Serializer
  attributes :id, :email, :first_name, :last_name, :name, :role, :profile_image_url, :bio, :created_at

  include Rails.application.routes.url_helpers

  # Added the profile_image_url method here

  def profile_image_url
    if object.profile_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(object.profile_image, only_path: false)
    end
  end

  attribute :organization do |user|
    if user.organization
      OrganizationSerializer.new(user.organization).serializable_hash[:data][:attributes]
    else
      {}
    end
  end

  attribute :addresses do |user|
    user.addresses.map { |address| AddressSerializer.new(address).serializable_hash[:data][:attributes] }
  end
end
