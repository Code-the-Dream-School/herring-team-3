require 'rails_helper'

RSpec.describe "Admin::Users", type: :request do
  let(:admin_user) { create(:user, :admin) }
  let(:regular_user) { create(:user, :regular_user) }

  describe "PATCH update_role" do
    context "when user role is admin" do
      it "allows admin to update user role" do
        sign_in admin_user
        patch admin_user_path(regular_user), params: { user: { role: "admin" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:ok)
        expect(regular_user.reload.role).to eq("admin")
      end
    end

    context "when user role is not admin" do
      it "does not allow regular user to update role" do
        sign_in regular_user
        patch admin_user_path(regular_user), params: { user: { role: "admin" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:forbidden)
        expect(regular_user.reload.role).not_to eq("admin")
      end
    end
  end
end
