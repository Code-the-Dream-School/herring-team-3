class AddFirstNameLastNameToUser < ActiveRecord::Migration[7.2]
  # Modified to add separate columns for first name and last name
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
  end
end
