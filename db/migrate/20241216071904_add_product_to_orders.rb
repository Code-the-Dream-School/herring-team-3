class AddProductToOrders < ActiveRecord::Migration[7.2]
  def change
    add_reference :orders, :product, polymorphic: true
  end
end
