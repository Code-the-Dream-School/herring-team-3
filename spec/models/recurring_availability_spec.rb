require 'rails_helper'

RSpec.describe RecurringAvailability, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:end_date) }

    it 'is invalid if end_date is in the past' do
      recurring_availability = RecurringAvailability.new(end_date: Date.yesterday)
      expect(recurring_availability).not_to be_valid
      expect(recurring_availability.errors[:end_date]).to include("can't be in the past")
    end

    it 'is valid if end_date is today or in the future' do
      recurring_availability = RecurringAvailability.new(end_date: Date.today)
      expect(recurring_availability).to be_valid
    end
  end
end
