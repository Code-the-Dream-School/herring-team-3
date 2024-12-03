require 'rails_helper'

RSpec.describe User, type: :model do
  let(:regular_user) { create(:user, :regular_user) }

  it "is valid with valid attributes" do
    expect(regular_user).to be_valid
  end

  it "is not valid without a name" do
    regular_user.first_name = nil
    expect(regular_user).to_not be_valid
  end

  it "is not valid without a valid role" do
    regular_user.role = "Not valid"
    expect(regular_user).to_not be_valid
  end

  it "is not valid without a valid email" do
    regular_user.email = "abc.com"
    expect(regular_user).to_not be_valid
  end

  it "is not valid without an email" do
    regular_user.email = nil
    expect(regular_user).to_not be_valid
  end
end
