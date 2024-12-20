class RecurringAvailability < ApplicationRecord
    has_many :availabilities, dependent: :destroy
    have_one :speaker, through: :availabilities

    validates :end_date, presence: true
    validate :end_date_cannot_be_in_the_past

  private

  def end_date_cannot_be_in_the_past
    if end_date.present? && end_date < Date.today
      errors.add(:end_date, "can't be in the past")
    end
  end
end
