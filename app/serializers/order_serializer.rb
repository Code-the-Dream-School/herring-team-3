class OrderSerializer < ActiveModel::Serializer
  # Defines how to display the Order model
  attributes :id, :order_name, :order_email, :ordered_kit, :product_type, :product_id :user_id, :school_name, :school_address, :school_year, :comments, :phone, :created_at

  def order_name
    object.user.name if object.user.present?
  end

  def ordered_kit
    object.product.name if object.product.present?
  end

  def order_email
    object.user.email if object.user.present?
  end
end
