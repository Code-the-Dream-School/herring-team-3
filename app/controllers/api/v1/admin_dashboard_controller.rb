class Api::V1::AdminDashboardController < ApplicationController
  # Method for show the information in the dashboard cards: user count, kit request count, and the total amount of donations.

  # GET /api/v1/admin_dashboard
  def index
    users_count = User.count
    orders_count = Order.count
    total_donations = Donation.sum(:amount)
    if current_user.role === "admin"
    render json: {
      users_count: users_count,
      orders_count: orders_count,
      total_donations: total_donations
    }, status: :ok
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
