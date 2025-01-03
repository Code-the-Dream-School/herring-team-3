FactoryBot.define do
  factory :event do
    speaker { nil }
    title { "MyString" }
    description { "MyString" }
    duration { 1 }
  end
end
