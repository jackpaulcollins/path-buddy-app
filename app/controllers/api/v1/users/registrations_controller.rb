# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < ApplicationController
        def create
          op = ::Users::UserRegistrationOp.new(sign_up_params)

          user = op.user if op.submit!
          jwt_token = generate_jwt_token(user_id: user.id)
          response.set_header('Authorization', "Bearer #{jwt_token}")

          render json: { user: }
        end

        private

        def generate_jwt_token(user_id:)
          exp = Time.now.to_i + 4 * 3600
          exp_payload = { data: user_id, exp: }
          a = ENV['JWT_ALGORITHM']
          s = ENV['JWT_SECRET_KEY']
          JWT.encode exp_payload, s, a
        end

        def sign_up_params
          params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
        end
      end
    end
  end
end
