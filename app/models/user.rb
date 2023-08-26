# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_digest, presence: true
  validates :jti, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :time_zone, presence: true
end
