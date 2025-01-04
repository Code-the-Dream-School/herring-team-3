class DropAddresses < ActiveRecord::Migration[7.2]
  def change
    drop_table :addresses, if_exists: true
  end
end
