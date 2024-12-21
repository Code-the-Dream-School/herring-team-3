require 'rails_helper'

RSpec.describe "Orders", type: :request do
  let(:admin_user) { create(:user, :admin) }
  let(:regular_user) { create(:user, :regular_user) }
  let(:kit) { create(:kit) }


  describe "GET /index" do
    it "returns a success response" do
      sign_in regular_user
      get api_v1_orders_path, headers: { 'Authorization': "Bearer #{@auth_token}" }
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    let(:order) { create(:order, user: regular_user, kit: kit) }
    it "returns a success response" do
      sign_in regular_user
      get api_v1_order_path(order), headers: { 'Authorization': "Bearer #{@auth_token}" }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["school_year"]).to eq(order.school_year)
    end
  end

  describe "POST /create" do
    let(:order) { create(:order, user: regular_user, kit: kit) }
    it "creates a new order" do
      sign_in regular_user
      expect {
        post api_v1_orders_path, params: { order: { school_year: "2025-2026", phone: "123-456-7890", comments: "This is wonderful", kit_id: kit.id } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
      }.to change(Order, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end

  describe "PATCH /update" do
    let(:order) { create(:order, user: regular_user, kit: kit) }
    it "updates the order" do
      sign_in regular_user
      patch api_v1_order_path(order), params: { order: { phone: "123-456-9999" } }, headers: { 'Authorization': "Bearer #{@auth_token}" }
      expect(response).to have_http_status(:ok)
      expect(order.reload.phone).to eq("123-456-9999")
    end
  end

  describe "DELETE /destroy" do
    context "when user is an admin" do
      let(:order) { create(:order, user: admin_user, kit: kit) }
      it "deletes the kit request" do
        sign_in admin_user
        delete api_v1_order_path(order), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:no_content)
        expect { order.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "when user is not an admin" do
      let(:order) { create(:order, user: regular_user, kit: kit) }
      it "denies access" do
        sign_in regular_user
        delete api_v1_order_path(order), headers: { 'Authorization': "Bearer #{@auth_token}" }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
