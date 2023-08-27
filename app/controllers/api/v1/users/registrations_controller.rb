# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < ApplicationController
        def create
          op = ::Users::UserRegistrationOp.submit(sign_up_params)

          if op.user.present?
            token = ::Tokens::GenerateJwtTokenOp.submit!(user: op.user).token
            append_token_to_response(token)

            render json: { user: op.user }, status: :ok
          else
            render json: { error: op.errors.full_messages.join('') }, status: :unprocessable_entity
          end
        end

        private

        def sign_up_params
          params.require(:user).permit(:email, :first_name, :last_name, :time_zone, :password, :password_confirmation)
        end
      end
    end
  end
end
