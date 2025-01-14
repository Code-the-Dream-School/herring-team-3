require 'rails_helper'

RSpec.describe Availability, type: :model do
  let(:speaker_user) { create(:user, :speaker_user) } # :speaker_user is a trait from users factory
  let(:recurring_availability) { create(:recurring_availability) }

  describe "associations" do
    it "belongs to a speaker" do
      availability = create(:availability, speaker: speaker_user)
      expect(availability.speaker).to eq(speaker_user)
    end

    it "can optionally belong to a recurring availability" do
      availability = create(:availability, recurring_availability: recurring_availability)
      expect(availability.recurring_availability).to eq(recurring_availability)
    end

    it "is valid without a recurring availability" do
      availability = build(:availability, recurring_availability: nil)
      expect(availability).to be_valid
    end
  end

  describe "validations" do
    it "is valid with all required attributes" do
      availability = FactoryBot.build(:availability, speaker: speaker_user)
      expect(availability).to be_valid
    end

    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:speaker) }
  end

  describe "time range validations" do
    context "when start_time is before end_time" do
      it "is valid" do
        availability = build(:availability, speaker: speaker_user, start_time: Time.zone.now, end_time: 1.hour.from_now)
        expect(availability).to be_valid
      end
    end

    context "when start_time is equal to or after end_time" do
      it "is invalid when start_time is after end_time" do
        availability = build(:availability, speaker: speaker_user, start_time: 1.hour.from_now, end_time: Time.zone.now)
        expect(availability).not_to be_valid
        expect(availability.errors[:start_time]).to include("must be before the end time")
      end
    end
  end

  describe "optional associations validation" do
    it "creates an availability with a speaker and optional recurring_availability" do
      recurring_availability = create(:recurring_availability)
      availability = create(:availability, speaker: speaker_user, recurring_availability: recurring_availability)
      expect(availability.speaker).to eq(speaker_user)
      expect(availability.recurring_availability).to eq(recurring_availability)
    end

    it "creates an availability without a recurring_availability" do
      availability = create(:availability, speaker: speaker_user, recurring_availability: nil)
      expect(availability.speaker).to eq(speaker_user)
      expect(availability.recurring_availability).to be_nil
    end
  end
end
