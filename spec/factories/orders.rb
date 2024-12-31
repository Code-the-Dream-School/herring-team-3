FactoryBot.define do
  factory :order do
    school_year { "2025-2026" }
    phone { "#{rand(100..999)}-#{rand(100..999)}-#{rand(1000..9999)}" }
    school_name { Faker::Educator.unique.secondary_school }
    school_address { Faker::Address.street_address + ", " + Faker::Address.city + ", " + Faker::Address.state_abbr + " " + Faker::Address.zip_code }
    comments { "This is wonderful" }
    transient do
      product {nil}
    end
    after(:build) do |order, evaluator|
          order.product = evaluator.product
    end
    #association :product, factory: :kit
    #association :product, factory: :donation
    association :user
  end
end
