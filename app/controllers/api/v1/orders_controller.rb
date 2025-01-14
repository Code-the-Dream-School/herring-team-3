class Api::V1::OrdersController < ApplicationController
  load_and_authorize_resource
  before_action :authenticate_user!

  # GET /api/v1/orders
  def index
    render json: @orders, status: :ok
  end

  # POST /api/v1/orders
  def create
    @order = Order.new(order_params)

    @order.user = current_user
    if @order.save
      @user = current_user
      @user.reload  # Reload the user to get the updated list of addresses
      @addresses = @user.addresses  # Get the addresses after reload

      render json: { order: @order, addresses: @addresses }, status: :created
      associate_address_with_user(@order)
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # GET /api/v1/orders/:id
  def show
    render json: @order, status: :ok
  end

  # PATCH/PUT /api/v1/orders/:id
  def update
    if @order.update(order_params)
      associate_address_with_user(@order)
      render json: @order, status: :ok
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/orders/:id
  def destroy
    @order.destroy
    render json: { message: "Order successfully deleted." }, status: :no_content
  end


  private

  def set_order
    @order = Order.find(params[:id])
  end

  def order_params
    params.require(:order).permit(:user_id, :phone, :school_year, :product_id, :product_type, :address_id, :comments, address_attributes: [ :id, :street_address, :city, :state, :postal_code, :save_to_user, :addressable_type, :addressable_id, :_destroy ])
  end

  def associate_address_with_user(order)
    if order.address && order.user
      # Add a condition to check if the address should be saved to user
      if order.address.save_to_user
        unless order.user.addresses.exists?(order.address.id)
          order.user.addresses << order.address
        end
      end
    end
  end
end
