class RenameAddressToStreetAddressInAddress < ActiveRecord::Migration[7.2]
  def change
    rename_column :addresses, :address, :street_address
  end
end
