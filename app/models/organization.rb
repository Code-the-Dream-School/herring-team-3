class Organization < ApplicationRecord
  has_many :users
  has_one :address, as: :addressable

 validates :name, :org_type, presence: true

  enum org_type: {
    school: 0,
    agency: 1,
    nonprofit: 2,
    other: 3
  }
end
