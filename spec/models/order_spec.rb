require "rails_helper"

RSpec.describe Order, type: :model do
  let(:kit) { create(:kit) }
  let(:regular_user) { create(:user, :regular_user) }
  let(:order) { create(:order, user: regular_user, product: kit) } # kit is one of the products
  
  it "is valid with valid attributes" do
    expect(order).to be_valid
  end

  it "is not valid without a valid school_year" do
    order = build(:order, school_year: "Not valid")
    expect(order).to_not be_valid
  end

  it "is not valid without a school_year" do
    order = build(:order, school_year: nil)
    expect(order).to_not be_valid
  end

  it "is not valid without a valid phone number" do
    order = build(:order, phone: "333445")
    expect(order).to_not be_valid
  end

  it "is not valid without a phone number" do
    order = build(:order, phone: nil)
    expect(order).to_not be_valid
  end

  it "is not valid without a school_name" do
    order = build(:order, school_name: nil)
    expect(order).to_not be_valid
  end

  it "is valid with a kit" do
    kit = create(:kit)
    order = create(:order, user: regular_user, product: kit)
    expect(order).to be_valid
  end

  #it "is valid with an event" do
    #event = create(:event)
    #order = create(:order, user: regular_user, product: event)
    #expect(order).to be_valid
  #end

  it "is valid with a donation" do
    donation = create(:donation, user: regular_user) #add the role
    order = create(:order, user: regular_user, product: donation)
    expect(order).to be_valid
  end
  

  it { should belong_to(:user) }

  it { should belong_to(:product) }
end
