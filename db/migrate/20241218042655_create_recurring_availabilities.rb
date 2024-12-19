class CreateRecurringAvailabilities < ActiveRecord::Migration[7.2]
  def change
    create_table :recurring_availabilities do |t|
      t.date :end_date

      t.timestamps
    end
  end
end
