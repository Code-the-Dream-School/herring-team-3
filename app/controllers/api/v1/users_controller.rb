class Api::V1::UsersController < ApplicationController
before_action :set_user, only: [ :update, :show ]
load_and_authorize_resource


  # GET /api/v1/users
  def index
    @users = User.all
    render json: UserSerializer.new(@users).serializable_hash.to_json
  end

  # GET /api/v1/users/1
  def show
    render json: @users
  end

  # PATCH/PUT api/v1/users/1
  def update
    if password_update?
      unless @user.authenticate(params[:old_password])
        return render json: { error: "Incorrect old password" }, status: :unauthorized
      end

      if @user.update(user_params)
        render json: { message: "Password updated successfully!" }, status: :ok
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    else 
      if @user.update(non_password_user_params)
        render json: { message: "User updated successfully!" }, status: :ok
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  # OLD PATCH/PUT api/v1/users/1
  # def update
  #   if @user.update(user_params)
  #     render json: { message: "User updated successfully!" }
  #   else
  #     render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end

  # DELETE api/v1/users/:id
  def destroy
    @user.destroy
    render json: { message: "User deleted successfully!" }
  end

  # Add profile action and pass current_user as params
  def profile
    @user = User.find(params[:id])
    render json: UserProfileSerializer.new(@user).serializable_hash
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  def password_update
    params[:new_password].present?
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :bio, :profile_image, :organization_id, :password)
  end

  def non_password_user_params
    params.permit(:first_name, :last_name, :email, :bio, :profile_image)
  end
end
