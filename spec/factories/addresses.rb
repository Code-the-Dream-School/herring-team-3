FactoryBot.define do
  factory :address do
    street_address { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    postal_code { Faker::Address.zip_code }
    association :addressable, factory: :user  # Default polymorphic association
  end
end
