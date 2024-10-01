class Api::V1::KitItemsController < ApplicationController
  before_action :set_kit_item, only: %i[ show update destroy ]
  load_and_authorize_resource

  # GET /api/v1/kits/1/kit_items
  def index
    kit = Kit.find(params[:kit_id])
    kit_items = kit.kit_items
    render json: kit_items
  end

  # GET /api/v1/kits/1/kit_items/1
  def show
    render json: @kit_item
  end

  # POST /api/v1/kits/1/kit_items
  def create
    @kit_item = KitItem.new(kit_item_params)

    if @kit_item.save
      render json: @kit_item, status: :created, location: @kit_item
    else
      render json: @kit_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/kits/1/kit_items/1
  def update
    if @kit_item.update(kit_item_params)
      render json: @kit_item
    else
      render json: @kit_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/kits/1/kit_items/1
  def destroy
    @kit_item.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_kit_item
      @kit_item = KitItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def kit_item_params
      params.require(:kit_item).permit(:name, :description, :image_url)
    end
end
