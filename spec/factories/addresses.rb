FactoryBot.define do
  factory :address do
    address { "MyString" }
    city { "MyString" }
    state { "MyString" }
    postal_code { "MyString" }
    addressable { nil }
  end
end
