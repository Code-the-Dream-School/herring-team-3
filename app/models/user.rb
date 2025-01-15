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
  has_many :bookings, through: :orders
  belongs_to :organization, optional: true


  # Added profile_image here
  has_one_attached :profile_image
  # Add profile_image_url method for user to facilitate user_profile_serializer
  include Rails.application.routes.url_helpers

  def profile_image_url
    rails_blob_url(profile_image, only_path: false) if profile_image.attached?
  end

  before_create :set_default_role

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, presence: true
  validates :role, inclusion: { in: ROLES }

  def set_default_role
    self.role ||= "user"
  end

  def admin?
    role == "admin"
  end

  def teacher?
    role == "teacher"
  end

  def speaker?
    role == "speaker"
  end

  def user?
    role == "user"
  end

  def name
    "#{first_name} #{last_name}"
  end
end
