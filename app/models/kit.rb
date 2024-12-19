class Kit < ApplicationRecord
  has_and_belongs_to_many :kit_items, join_table: "kit_items_kits"
  has_one_attached :image
  has_many :orders, as: :product

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true, length: { minimum: 10 }
  # Validates that grade level is one of the acceptable values.
  validates :grade_level, presence: true, inclusion: { in: %w[PK-2 3-5 6-8 9-12] }
end
