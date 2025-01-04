class RemoveAddressIdFromOrders < ActiveRecord::Migration[7.2]
  def change
    # Remove the foreign key constraint
    remove_foreign_key :orders, :addresses, if_exists: true

    # Remove the column
    remove_column :orders, :address_id, :integer, if_exists: true
  end
end
