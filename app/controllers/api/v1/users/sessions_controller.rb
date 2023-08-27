# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < ApplicationController
        def create
          op = ::Users::LoginOp.submit(session_params)

          if op.user.present?
            op.user.refresh_jti_token!
            token = ::Tokens::GenerateJwtTokenOp.submit!(user: op.user).token
            append_token_to_response(token)

            render json: { user: op.user }, status: :ok
          else
            render json: { error: op.errors.full_messages.join('') }, status: :unauthorized
          end
        end

        private

        def session_params
          params.require(:user).permit(:email, :password)
        end
      end
    end
  end
end
