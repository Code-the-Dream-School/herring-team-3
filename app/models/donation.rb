class Donation < ApplicationRecord
  belongs_to :user
  has_many :orders, as: :product
  # Defines whether a donation is active. If the donation is destroyed, it is not deleted, only canceled and made inactive.
  scope :active, -> { where(canceled: false) }
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :payment_status, presence: true

  attribute :canceled, :boolean, default: false
end
