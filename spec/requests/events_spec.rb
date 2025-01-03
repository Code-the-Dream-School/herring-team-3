require 'rails_helper'

RSpec.describe "Events", type: :request do
  let(:speaker_user) { create(:user, :speaker_user) }
  let(:admin_user) { create(:user, :admin) }
  let(:regular_user) { create(:user, :regular_user) }

  describe "GET /index" do
    it "returns a success response" do
      sign_in admin_user
      get api_v1_events_path, headers: { 'Authorization': "Bearer #{@auth_token}" }
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    let(:event) { create(:event) }

    it "returns a success response" do
      sign_in regular_user
      get api_v1_event_path(event), headers: { 'Authorization': "Bearer #{@auth_token}" }
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /create" do
    let(:speaker_user) { create(:user, :speaker_user) }

    it "creates a new Event" do
      sign_in speaker_user
      event_params = {
        event: {
          title: "Sample Event",
          description: "This is a sample event description.",
          duration: 2,
          speaker_id: speaker_user.id
        }
      }

      expect {
        post api_v1_events_path, params: event_params, headers: { 'Authorization': "Bearer #{@auth_token}" }
      }.to change(Event, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end

  describe "PUT /update" do
    let(:event) { create(:event) }
    let(:new_attributes) { { title: "Updated Title" } }

    it "updates the requested event" do
      sign_in speaker_user
      put api_v1_event_path(event), params: { event: new_attributes }, headers: { 'Authorization': "Bearer #{@auth_token}" }
      event.reload
      expect(event.title).to eq("Updated Title")
      expect(response).to have_http_status(:ok)
    end
  end

  # Booking model not created yet
  # describe "DELETE /destroy" do
  #   let!(:event) { create(:event) }

  #   it "deletes the requested event" do
  #     sign_in speaker_user
  #     expect {
  #       delete api_v1_event_path(event), headers: { 'Authorization': "Bearer #{@auth_token}" }
  #     }.to change(Event, :count).by(-1)
  #     expect(response).to have_http_status(:no_content)
  #   end
  # end
end
