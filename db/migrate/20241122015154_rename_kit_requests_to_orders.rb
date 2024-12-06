class RenameKitRequestsToOrders < ActiveRecord::Migration[7.2]
  def change
    rename_table :kit_requests, :orders
  end
end
