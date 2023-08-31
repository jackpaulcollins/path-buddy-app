# frozen_string_literal: true

module Api
  module V1
    module Users
      class OauthController < ApplicationController
        def login_or_register
          token_data = JWT.decode(oauth_params[:token], nil, false).first

          if user = ::User.find_by_email(token_data["email"])
            token = generate_new_token(user)
            append_token_to_response(token)

            render json: { user: }, status: :ok
          else
           new_user = ::Users::RegisterFromOauthOp.submit!(email: token_data["email"], name: token_data["name"]).user
           token = generate_new_token(new_user)
           append_token_to_response(token)

           render json: { new_user: }, status: :ok
          end
        end

        private

        def generate_new_token(user)
          user.refresh_jti_token!
          ::Tokens::GenerateJwtTokenOp.submit!(user: user).token
        end

        def oauth_params
          params.require(:credentials).permit(:provider, :token)
        end
      end
    end
  end
end
