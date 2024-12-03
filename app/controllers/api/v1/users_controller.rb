class Api::V1::UsersController < ApplicationController
load_and_authorize_resource
before_action :set_user, only: [ :update, :show ]

  # Using this controller to alter User model, but this functionality could be transferred to Devise built in controllers
  # GET /api/v1/users
  def index
    @users = User.all
    render json: @users
  end

  # GET /api/v1/users/1
  def show
    render json: @users
  end

  # The create method is handled by Devise users/registration
  # def create
  #   @user = User.new(user_params)
  #   if @user.save
  #     render json: { message: "User created successfully!" }, status: :created
  #   else
  #     render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end

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
end

private

def set_user
  @user = User.find(params[:id])
end

def user_params
  params.require(:user).permit(:first_name, :last_name, :role)
end
