class ChangeAddressableToPolymorphicOnAddresses < ActiveRecord::Migration[7.2]
  def change
    remove_column :addresses, :addressable_id

    # Add the polymorphic addressable column
    add_reference :addresses, :addressable, polymorphic: true, null: false
  end
end
