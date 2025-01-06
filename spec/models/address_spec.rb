require 'rails_helper'

RSpec.describe Address, type: :model do
  describe "Associations" do
    it { should belong_to(:addressable) }
    it { should have_many(:orders) }
  end

  describe "Validations" do
    it { should validate_presence_of(:street_address) }
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:postal_code) }
    it { should validate_presence_of(:addressable) }

    describe "postal_code format" do
      it "is valid with a 5-digit postal code" do
        address = build(:address, postal_code: "12345")
        expect(address).to be_valid
      end

      it "is valid with a 9-digit postal code (ZIP+4)" do
        address = build(:address, postal_code: "12345-6789")
        expect(address).to be_valid
      end

      it "is invalid with an incorrect postal code format" do
        address = build(:address, postal_code: "1234")
        expect(address).not_to be_valid
        expect(address.errors[:postal_code]).to include("must be a valid postal code")
      end
    end
  end
end
