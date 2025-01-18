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
  # def update
  #   if password_update?
  #     unless @user.authenticate(params[:old_password])
  #       return render json: { error: "Incorrect old password" }, status: :unauthorized
  #     end

  #     if @user.update(user_params)
  #       render json: { message: "Password updated successfully!" }, status: :ok
  #     else
  #       render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
  #     end
  #   else
  #     if @user.update(non_password_user_params)
  #       render json: { message: "Profile updated successfully!" }, status: :ok
  #     else
  #       render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
  #     end
  #   end
  # end

  # OLD PATCH/PUT api/v1/users/1
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
    @user = User.find(params[:id])
    render json: UserProfileSerializer.new(@user).serializable_hash
  end

#   def update_password
#     user = current_user

#     # Check if the old password is correct
#     if user.authenticate(params[:old_password])
#       # Update the password
#       if user.update(password: params[:new_password])
#         render json: { message: 'Password updated successfully.' }, status: :ok
#       else
#         render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
#       end
#     else
#       render json: { error: 'Invalid old password.' }, status: :unauthorized
#     end
#   end
# end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  def password_update?
    params[:password].present?
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :bio, :profile_image, :organization_id, :password)
  end
end
