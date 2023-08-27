# frozen_string_literal: true

module Users
  class LoginOp < BaseOp
    string :email
    string :password
    outputs :user

    protected

    def perform
      user = ::User.find_by(email: email)

      # returns false if pw is incorrect
      validated_user = user.authenticate(password)

      output :user, validated_user
    end
  end
end
