# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # Method that allows the Rails API to create session? I am not sure how it works, but it makes Devise work properly with Rails API only.
  include RackSessionFix

  before_action :configure_sign_up_params, only:  [ :create ]
  before_action :configure_account_update_params, only: [ :update ]

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    case request.method
    when "POST"
      if resource.persisted?
        render json: {
        status: { code: 200, message: "Signed up successfully." },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }, status: :ok
      else
        render json: {
        status: { code: 422, message: "User couldn't be created successfully.", errors: resource.errors.full_messages }
        }, status: :unprocessable_entity
      end
    when "DELETE"
      if resource.destroyed?
        render json: {
        status: { code: 200, message: "Account deleted successfully." }
        }, status: :ok
      else
        render json: {
        status: { code: 422, message: "Account couldn't be deleted." }
        }, status: :unprocessable_entity
      end
    else
      render json: {
      status: { code: 405, message: "Method not allowed." }
      }, status: :method_not_allowed
    end
  end

  protected

  # Permit additional parameters for sign up
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :role ])
  end

  # Permit additional parameters for account update
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [ :first_name, :last_name, :role ])
  end
end
