require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  let(:admin_user) { create(:user, :admin_user) }
  let(:teacher_user) { create(:user, :teacher_user) }
  let(:speaker_user) { create(:user, :speaker_user) }
  let(:address) { create(:address, addressable: teacher_user) }
  let(:kit) { create(:kit) }
  let(:event) { create(:event, speaker: speaker_user) }
  let(:order) { create(:order, user: teacher_user, product: event, product_type: 'Event', product_id: event.id, address: address) }
  let(:booking) { create(:booking, event: event, order: order, start_time: Time.now, end_time: Time.now + 1.hour, status: :pending) }

  subject(:ability) { Ability.new(user) }

  context 'when user is an admin' do
    let(:user) { admin_user }

    it 'can manage all' do
      expect(ability).to be_able_to(:manage, :all)
    end
  end

  context 'when user is a teacher' do
    let(:user) { teacher_user }

    it 'can read their own profile' do
      expect(ability).to be_able_to(:read, User, id: user.id)
    end

    it 'can update their own profile' do
      expect(ability).to be_able_to(:update, User, id: user.id)
    end

    it 'can profile their own profile' do
      expect(ability).to be_able_to(:profile, User, id: user.id)
    end

    it 'can read kits' do
      expect(ability).to be_able_to(:read, Kit)
    end

    it 'can create donations' do
      expect(ability).to be_able_to(:create, Donation)
    end

    it 'can read their own donations' do
      expect(ability).to be_able_to(:read, Donation, user_id: user.id)
    end

    it 'cannot update donations' do
      expect(ability).not_to be_able_to(:update, Donation)
    end

    it 'can read their own bookings' do
      expect(ability).to be_able_to(:read, Booking, user_id: user.id)
    end

    it 'can create bookings' do
      expect(ability).to be_able_to(:create, Booking)
    end

    it 'can update their own bookings' do
      expect(ability).to be_able_to(:update, Booking, user_id: user.id)
    end

    it 'can read their own orders' do
      expect(ability).to be_able_to(:read, Order, user_id: user.id)
    end

    it 'can create orders' do
      expect(ability).to be_able_to(:create, Order)
    end

    it 'can update their own orders' do
      expect(ability).to be_able_to(:update, Order, user_id: user.id)
    end
  end

  context 'when user is a speaker' do
    let(:user) { speaker_user }

    it 'can read their own profile' do
      expect(ability).to be_able_to(:read, User, id: user.id)
    end

    it 'can update their own profile' do
      expect(ability).to be_able_to(:update, User, id: user.id)
    end

    it 'can profile their own profile' do
      expect(ability).to be_able_to(:profile, User, id: user.id)
    end

    it 'can read kits' do
      expect(ability).to be_able_to(:read, Kit)
    end

    it 'can create donations' do
      expect(ability).to be_able_to(:create, Donation)
    end

    it 'can read their own donations' do
      expect(ability).to be_able_to(:read, Donation, user_id: user.id)
    end

    it 'cannot update donations' do
      expect(ability).not_to be_able_to(:update, Donation)
    end

    it 'can read bookings for their events' do
      expect(ability).to be_able_to(:read, Booking, event: { speaker_id: user.id })
    end

    it 'can manage their own events' do
      expect(ability).to be_able_to(:manage, Event, speaker_id: user.id)
    end

    it 'can update bookings for their events' do
      expect(ability).to be_able_to(:update, Booking, event: { speaker_id: user.id })
    end

    it 'can manage their own availability' do
      expect(ability).to be_able_to(:manage, Availability, speaker_id: user.id)
    end
  end

  context 'when user is a guest' do
    let(:user) { User.new }

    it 'can read their own profile' do
      expect(ability).to be_able_to(:read, User, id: user.id)
    end

    it 'can update their own profile' do
      expect(ability).to be_able_to(:update, User, id: user.id)
    end

    it 'can profile their own profile' do
      expect(ability).to be_able_to(:profile, User, id: user.id)
    end

    it 'can read kits' do
      expect(ability).to be_able_to(:read, Kit)
    end

    it 'can create donations' do
      expect(ability).to be_able_to(:create, Donation)
    end

    it 'can read their own donations' do
      expect(ability).to be_able_to(:read, Donation, user_id: user.id)
    end

    it 'cannot update donations' do
      expect(ability).not_to be_able_to(:update, Donation)
    end
  end
end
