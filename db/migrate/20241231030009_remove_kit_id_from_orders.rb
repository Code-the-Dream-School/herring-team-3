class RemoveKitIdFromOrders < ActiveRecord::Migration[7.2]
  def up
    # define the changes kit id into product id
    Order.where.not(kit_id: nil).find_each do |order|
      order.update(product_id: order.kit_id, product_type: "Kit")
  end
  remove_column :orders, :kit_id, :integer
  end
end
