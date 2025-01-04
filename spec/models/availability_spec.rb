require 'rails_helper'

RSpec.describe Availability, type: :model do
  let(:speaker) { create(:user, role: "speaker") }

  describe "associations" do
    it { should belong_to(:speaker).class_name("User") }
    it { should belong_to(:recurring_availability).optional }
  end

  describe "validations" do
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:speaker) }
  end

  describe "time range validations" do
    context "when start_time is before end_time" do
      it "is valid" do
        availability = build(:availability, speaker: speaker, start_time: Time.zone.now, end_time: 1.hour.from_now)
        expect(availability).to be_valid
      end
    end

    context "when start_time is equal to or after end_time" do
      it "is invalid when start_time is after end_time" do
        availability = build(:availability, speaker: speaker, start_time: 1.hour.from_now, end_time: Time.zone.now)
        expect(availability).not_to be_valid
        expect(availability.errors[:start_time]).to include("must be before the end time")
      end
    end
  end

  describe "optional associations validation" do
    it "creates an availability with a speaker and optional recurring_availability" do
      recurring_availability = create(:recurring_availability)
      availability = create(:availability, speaker: speaker, recurring_availability: recurring_availability)
      expect(availability.speaker).to eq(speaker)
      expect(availability.recurring_availability).to eq(recurring_availability)
    end

    it "creates an availability without a recurring_availability" do
      availability = create(:availability, speaker: speaker, recurring_availability: nil)
      expect(availability.speaker).to eq(speaker)
      expect(availability.recurring_availability).to be_nil
    end
  end
end
