class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin
  load_and_authorize_resource
  before_action :set_user, only: [ :update ]

  # PATCH admin/users/:id
  def update
    if @user.update(admin_user_params)
      render json: { message: "User updated successfully!" }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def authorize_admin
    render json: { error: "You are not authorized to perform this action" }, status: :forbidden unless current_user.role == "admin"
  end

  def set_user
    @user = User.find(params[:id])
  end

  def admin_user_params
    if current_user.role === "admin"
      params.require(:user).permit(:first_name, :last_name, :role)
    else
      params.require(:user).permit(:first_name, :last_name)
    end
  end
end
