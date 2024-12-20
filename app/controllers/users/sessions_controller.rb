# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: "Logged in sucessfully." },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        status: { code: 401, message: "Invalid login credentials." }
    }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: { code: 200,
        message: "Logged out successfully." }
      }, status: :ok
    else
      render json: {
        status: { code: 401,
        message: "Couldn't find an active session." }
      }, status: :unauthorized
    end
  end
end
