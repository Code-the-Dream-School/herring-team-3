class RemoveSchoolNameAndSchoolAddressFromOrdersAgain < ActiveRecord::Migration[7.2]
  def change
    change_table :orders do |t|
      t.remove :school_name, :school_address
    end
  end
end
