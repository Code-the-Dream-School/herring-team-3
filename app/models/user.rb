class User < ApplicationRecord
  # Provides a token for authentication and details for token expiration
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  # Defines available roles and sets default role as user.
  ROLES = %w[admin user teacher speaker].freeze

  has_many :orders
  has_many :donations, -> { where(canceled: false) }
  has_many :contacts
  has_many :addresses, as: :addressable
  has_many :events, foreign_key: :speaker_id, dependent: :nullify
  has_many :availabilities, foreign_key: :speaker_id, dependent: :destroy

  belongs_to :organization, optional: true

  before_create :set_default_role

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :role, inclusion: { in: ROLES }

  def name
    "#{first_name} #{last_name}"
  end

  def set_default_role
    self.role ||= "user"
  end
end
