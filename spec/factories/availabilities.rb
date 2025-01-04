FactoryBot.define do
  factory :availability do
    start_time { Faker::Time.forward(days: 7, period: :morning) }
    end_time { start_time + 1.hour }
    association :speaker, factory: [ :user, :speaker ]
    association :recurring_availability
  end
end
