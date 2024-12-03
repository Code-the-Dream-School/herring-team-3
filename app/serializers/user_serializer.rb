class UserSerializer
  # Defines how to display the user model, uses JSONAPI because it is required by my Devise implementation.
  include JSONAPI::Serializer
  attributes :id, :email, :first_name, :last_name, :role, :created_at
end
