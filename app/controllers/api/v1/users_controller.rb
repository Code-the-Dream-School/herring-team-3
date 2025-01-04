class Api::V1::UsersController < ApplicationController
before_action :set_user, only: [ :update, :show ]
load_and_authorize_resource


  # GET /api/v1/users
  def index
    @users = User.all
    render json: @users
  end

  # GET /api/v1/users/1
  def show
    render json: @users
  end

  # PATCH/PUT api/v1/users/1
  def update
    if @user.update(user_params)
      render json: { message: "User updated successfully!" }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE api/v1/users/:id
  def destroy
    @user.destroy
    render json: { message: "User deleted successfully!" }
  end

  # Add profile action and pass current_user as params
  def profile
    render json: UserProfileSerializer.new(current_user)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :bio)
  end
end
