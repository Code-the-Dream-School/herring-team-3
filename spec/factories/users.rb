FactoryBot.define do
  factory :user do
    # Adjusted faker for first and last name
    first_name { Faker::Name.unique.first_name }
    last_name { Faker::Name.unique.last_name }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password(min_length: 8) }

    trait :admin do
      role { "admin" }
    end

    trait :regular_user do
      role { "user" }
    end
  end
end
