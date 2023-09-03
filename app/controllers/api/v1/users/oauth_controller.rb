# frozen_string_literal: true

module Api
  module V1
    module Users
      class OauthController < ApplicationController
        def login_or_register
          user = ::Tokens::JwtOauthExchangeOp.submit!(token_data: oauth_params).user
          token = generate_new_token(user)
          append_token_to_response(token)

          render json: { user: }, status: :ok
        end

        private

        def generate_new_token(user)
          ::Tokens::GenerateJwtTokenOp.submit!(user: user).token
        end

        def oauth_params
          params.require(:credentials).permit(:provider, :token)
        end
      end
    end
  end
end
