class Order < ApplicationRecord
  belongs_to :user
  belongs_to :product, polymorphic: true
  belongs_to :address

  accepts_nested_attributes_for :address, allow_destroy: true
  before_validation :normalize_phone_number

  # Validates that phone number is in the right 10 digit format
  validates :phone, presence: true, format: { with: /\A\d{10}\z/, message: "must be a valid 10-digit phone number" }

  # validates school year with more flexibility
  validates :school_year, presence: true, format: {
    with: /\A\d{4}(-\d{2,4})?\z/,
    message: "must be in the fomat 'YYYY' or  'YYYY-YY' or 'YYYY-YYYY' "
  }

  validates :comments, allow_blank: true, length: { maximum: 500, message: "cannot exceed 500 characters" }

  # Ensure each user can only request one kit per school year
  validates :school_year, uniqueness: { scope: :user_id, message: "You can only request one kit per school year" }

  # Validates that the product is present
  validates :product, presence: true

  def normalize_phone_number
    return if phone.blank?

    # Remove any non-numeric characters
    cleaned_phone = phone.delete("^0-9")

    # If the cleaned phone number is 10 digits, leave it as is
    if cleaned_phone.length == 10
      self.phone = cleaned_phone
    else
      # If it's longer than 10 digits (starts with "1"), remove the "1" prefix
      self.phone = cleaned_phone.delete_prefix("1")
    end
  end
end
