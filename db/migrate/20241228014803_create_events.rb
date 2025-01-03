class CreateEvents < ActiveRecord::Migration[7.2]
  def change
    create_table :events do |t|
      t.references :speaker, null: false, foreign_key: { to_table: :users }
      t.string :title, null: false
      t.string :description
      t.integer :duration, null: false

      t.timestamps
    end
  end
end
