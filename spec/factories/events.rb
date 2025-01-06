FactoryBot.define do
  factory :event do
    association :speaker, factory: [ :user, :speaker_user ]
    title { Faker::Lorem.sentence(word_count: 5) }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
    duration { Faker::Number.between(from: 30, to: 60) }
  end
end
