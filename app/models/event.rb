class Event < ApplicationRecord
  belongs_to :speaker, -> { where(role: "speaker") }, class_name: "User"
  has_many :bookings, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
  validates :duration, presence: true
end
