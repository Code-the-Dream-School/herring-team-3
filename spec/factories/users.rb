FactoryBot.define do
  factory :user do
    # Adjusted faker for first and last name
    first_name { Faker::Name.unique.first_name }
    last_name { Faker::Name.unique.last_name }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password(min_length: 8) }
    role { "user" } # Default role

    trait :admin_user do
      role { "admin" }
    end

    trait :regular_user do
      role { "user" }
    end

    trait :speaker_user do
      role { "speaker" }
    end

    trait :teacher_user do
      role { "teacher" }
    end

    trait :regular_user do
      role { "user" }
    end
      
    trait :guest_user do
      role { "guest" }
    end

    # To include address-user associations
    after(:build) do |user|
      user.addresses << build(:address, addressable: user)
    end
  end
end
