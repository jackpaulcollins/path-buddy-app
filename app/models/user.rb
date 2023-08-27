# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_digest, presence: true
  validates :jti, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :time_zone, inclusion: { in: System::TIME_ZONES }

  def refresh_jti_token!
    update!(jti: SecureRandom.uuid)
    reload
  end
end
