# frozen_string_literal: true

module Users
  class PasswordCreateOp < BaseOp
    string :clear_text_password
    outputs :encrypted_password

    protected

    def perform
      encrypted_password = BCrypt::Password.create(clear_text_password)
      output :encrypted_password, encrypted_password
    end
  end
end
