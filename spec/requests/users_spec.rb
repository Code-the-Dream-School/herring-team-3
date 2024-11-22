require 'rails_helper'

RSpec.describe "Users", type: :request do
  let(:admin_user) { create(:user, :admin) }
  let(:regular_user) { create(:user, :regular_user) }


  describe "GET /index" do
    context "when user role is admin" do
      it "returns http success" do
        sign_in admin_user
        get api_v1_users_path, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:success)
      end
    end
    context "when user role is not admin" do
      it "returns http response forbidden" do
        sign_in regular_user
        get api_v1_users_path, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "GET/ show" do
    context "when user role is admin" do
      it "returns http success" do
        sign_in admin_user
        get api_v1_user_path(admin_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:success)
      end
    end
    context "when user role is not admin" do
      it "returns http response forbidden" do
        sign_in regular_user
        get api_v1_user_path(regular_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "PATCH/PUT update" do
    context "when user role is admin" do
      it "allows user record to be updated" do
        sign_in admin_user
        patch api_v1_user_path(regular_user), params: { user: { role: "admin" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:ok)
        expect(regular_user.reload.role).to eq("admin")
      end
    end
    context "when user role is not admin" do
      it "allows user's own record to be updated" do
        sign_in regular_user
        patch api_v1_user_path(regular_user), params: { user: { name: "Joe Smith" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:success)
        expect(regular_user.reload.name).to eq("Joe Smith")
      end
    end
  end

  describe "DELETE /destroy" do
    context "when user is an admin" do
      it "deletes the user" do
        sign_in admin_user
        delete api_v1_user_path(regular_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:ok)
      end
    end

    context "when user is not an admin" do
      it "denies access" do
        sign_in regular_user
        delete api_v1_user_path(regular_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
