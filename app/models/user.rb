class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  ROLES = %w[admin user].freeze
  has_many :kit_requests
  has_many :donations, -> { where(canceled: false) }
  has_many :contacts

  before_create :set_default_role

  validates :name, presence: true
  validates :role, inclusion: { in: ROLES }

  def set_default_role
    self.role ||= "user"
  end
end
