FactoryBot.define do
  factory :organization do
    name { Faker::Educator.secondary_school }
    org_type { :school }
  end
end
