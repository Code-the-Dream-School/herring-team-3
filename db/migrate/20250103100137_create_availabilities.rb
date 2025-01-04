class CreateAvailabilities < ActiveRecord::Migration[7.2]
  def change
    create_table :availabilities do |t|
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.references :speaker, null: false, foreign_key: { to_table: :users }
      t.references :recurring_availability, null: true, foreign_key: true

      t.timestamps
    end
  end
end
