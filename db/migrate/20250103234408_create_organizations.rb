class CreateOrganizations < ActiveRecord::Migration[7.2]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.integer :org_type, default: 0, null: false

      t.timestamps
    end
  end
end
