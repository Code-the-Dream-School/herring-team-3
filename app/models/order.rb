class Order < ApplicationRecord
  belongs_to :kit
  belongs_to :user
  has_one :address, as: :addressable

  # Validates that phone number is in the right format
  validates :phone, presence: true, format: { with: /\A\d{3}-\d{3}-\d{4}\z/, message: "must be in the format 'XXX-XXX-XXXX'" }

  # Validates that shchool year is in the right format
  validates :school_year, presence: true, format: { with: /\A\d{4}-\d{4}\z/, message: "must be in the format 'YYYY-YYYY'" }
  validates :comments, allow_blank: true, length: { maximum: 500, message: "cannot exceed 500 characters" }

  # Ensure each user can only request one kit per school year
  validates :school_year, uniqueness: { scope: :user_id, message: "You can only request one kit per school year" }
end
