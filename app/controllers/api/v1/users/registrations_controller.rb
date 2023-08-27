# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < ApplicationController
        after_action :append_token_to_response, only: [:create]

        def create
          op = ::Users::UserRegistrationOp.new(sign_up_params)
          user = op.user if op.submit!
          @token = ::Tokens::GenerateJwtTokenOp.submit!(user_id: user.id).token

          render json: { user: user }
        end

        private

        def append_token_to_response
          response.set_header('Authorization', "Bearer #{@token}")
        end

        def sign_up_params
          params.require(:user).permit(:email, :first_name, :last_name, :time_zone, :password, :password_confirmation)
        end
      end
    end
  end
end
