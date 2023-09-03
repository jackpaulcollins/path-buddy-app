# frozen_string_literal: true

module Tokens
  class JwtOauthExchangeOp < BaseOp
    object :token_data
    outputs :user

    protected

    def perform
      claims = get_claims_from_token

      user = try_to_find_user_from_token(claims['email'])

      unless user.present?
        user = ::Users::RegisterFromOauthOp.submit!(email: claims['email'], name: claims['name']).user
      end

      user.refresh_jti_token!

      output :user, user
    end

    def get_claims_from_token
      JWT.decode(token_data[:token], nil, false).first
    end

    def try_to_find_user_from_token(email)
      ::User.find_by_email(email)
    end
  end
end
