class AddColumnsToOrders < ActiveRecord::Migration[7.2]
  def change
    change_table :orders do |t|
      t.text :school_name
      t.text :school_address
    end
  end
end
