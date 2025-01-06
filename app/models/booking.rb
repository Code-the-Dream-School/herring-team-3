class Booking < ApplicationRecord
  belongs_to :event

  has_one :speaker, through: :event
  has_one :order, as: :product
  has_one :user, through: :order

  enum status: { pending: 0, confirmed: 1, denied: 2 }

  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :status, presence: true
end
