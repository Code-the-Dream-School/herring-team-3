require 'rails_helper'

RSpec.describe Event, type: :model do
  let(:speaker_user) { create(:user, :speaker_user) }

  before do
    @event = build(:event, speaker: speaker_user)
  end

  it "is valid with valid attributes" do
    expect(@event).to be_valid
  end

  it { should belong_to(:speaker).class_name('User') }

  # Booking does not exist yet
  # it { should have_many(:bookings).dependent(:destroy) }

  it "is invalid without a title" do
    @event.title = nil
    expect(@event).not_to be_valid
    expect(@event.errors[:title]).to include("can't be blank")
  end

  it "is invalid without a description" do
    @event.description = nil
    expect(@event).not_to be_valid
    expect(@event.errors[:description]).to include("can't be blank")
  end

  it "is invalid without a duration" do
    @event.duration = nil
    expect(@event).not_to be_valid
    expect(@event.errors[:duration]).to include("can't be blank")
  end
end
