require 'rails_helper'

RSpec.describe "Users", type: :request do
  let(:admin_user) { create(:user, :admin_user) }
  let(:regular_user) { create(:user, :regular_user) }
  # let(:speaker_user) { create(:user, role: 'speaker', events: [ create(:event) ], availabilities: [ create(:availability) ]) }
  # let(:teacher) { create(:user, role: 'teacher') }
  let(:speaker_user) do
    create(
      :user,
      role: 'speaker',
      events: [ create(:event) ],
      availabilities: [ create(:availability) ],
    )
  end
  let(:teacher_user) do
    create(
      :user,
      role: 'teacher',
    )
  end

  describe "GET /index" do
    context "when user role is admin" do
      it "returns http success" do
        sign_in admin_user
        get api_v1_users_path, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:success)
      end
    end
    # Changed user permission to allow viewing speakers
    context "when user role is not admin" do
      it "returns http response success" do
        # changed permissions to view speaker index
        sign_in regular_user
        get api_v1_users_path, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "GET /show" do
    context "when user role is admin" do
      it "returns http success" do
        sign_in admin_user
        get api_v1_user_path(admin_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:success)
      end
    end
    # Changed user permission to allow viewing speaker profile
    context "when user role is not admin" do
      it "returns http response success" do
        # Changed permissions to view speakers
        sign_in regular_user
        get api_v1_user_path(regular_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "PATCH/PUT update" do
    context "when user role is admin" do
      it "allows user record to be updated" do
        sign_in admin_user
        patch api_v1_user_path(regular_user), params: { id: regular_user.id, user: { first_name: "Jane", last_name: "Doe" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:ok)
        expect(regular_user.reload.first_name).to eq("Jane")
        expect(regular_user.reload.last_name).to eq("Doe")
      end
    end

    context "when user role is not admin" do
      it "allows user's own record to be updated" do
        sign_in regular_user
        patch api_v1_user_path(regular_user), params: { id: regular_user.id, user: { first_name: "Joe", last_name: "Smith" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:ok)
        expect(regular_user.reload.first_name).to eq("Joe")
        expect(regular_user.reload.last_name).to eq("Smith")
      end

      it "does not allow user to update role" do
        sign_in regular_user
        patch api_v1_user_path(regular_user), params: { user: { role: "admin" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:forbidden)
        expect(regular_user.reload.role).not_to eq("admin")
      end
    end

    it "updates the user's bio" do
      sign_in regular_user
      patch api_v1_user_path(regular_user), params: { user: { bio: "This is my bio" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
      expect(response).to have_http_status(:success)
      expect(regular_user.reload.bio).to eq("This is my bio")
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

#  describe "GET /profile" do
context "when user is a speaker" do
  it "returns the full speaker profile with all bookings and events" do
    sign_in speaker_user
    get profile_api_v1_user_path(speaker_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
    expect(response).to have_http_status(:success)

    json_response = JSON.parse(response.body)
    expect(json_response['data']['attributes']).to include(
      'bio', 'profile_image_url', 'events', 'availabilities', 'pending_bookings', 'confirmed_bookings'
    )
  end
end

context "when user is a teacher" do
  it "returns a teacher profile with limited information" do
    sign_in teacher_user
    get profile_api_v1_user_path(teacher_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
    expect(response).to have_http_status(:success)

    json_response = JSON.parse(response.body)
    expect(json_response['data']['attributes']).to include(
      'bio', 'profile_image_url', 'events', 'availabilities', 'bookings'
    )
  end
end

context "when teacher views a speaker profile" do
  it "returns the speaker profile with limited information" do
    sign_in teacher_user
    get profile_api_v1_user_path(speaker_user), headers: { 'Authorization': "Bearer #{@auth_token}" }
    expect(response).to have_http_status(:success)

    json_response = JSON.parse(response.body)
    expect(json_response['data']['attributes']).to include(
      'bio', 'profile_image_url', 'events', 'availabilities'
    )
    expect(json_response['data']['attributes']).not_to include(
      'pending_bookings', 'confirmed_bookings'
    )
  end
end
end
