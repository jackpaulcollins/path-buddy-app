# frozen_string_literal: true

module Users
  class LoginOp < BaseOp
    string :email
    string :password
    outputs :user

    protected

    def perform
      user = ::User.find_by(email: email)

      return errors.add(:base, "The email you entered hasn't been registered with an account.") unless user.present?

      validated_user = user.authenticate(password)
      errors.add(:base, 'Password is incorrect') unless validated_user.present?

      output :user, validated_user
    end
  end
end
