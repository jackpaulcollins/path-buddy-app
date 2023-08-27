# frozen_string_literal: true

module Users
  class UserRegistrationOp < ::Subroutine::Op
    string :email
    string :first_name
    string :last_name
    string :password
    string :password_confirmation
    string :time_zone
    outputs :user

    protected

    def perform
      encrypted_password = ::Users::PasswordCreateOp.submit!(clear_text_password: password).encrypted_password
      user = create_user!(encrypted_password)
      output :user, user
    end

    def create_user!(encrypted_password)
      User.create! do |u|
        u.email = email
        u.first_name = first_name
        u.last_name = last_name
        u.password_digest = encrypted_password
        u.jti = SecureRandom.uuid
        u.time_zone = time_zone
      end
    end
  end
end
