# frozen_string_literal: true

module Tokens
  class JwtTokenExchangeOp < BaseOp
    class TokenExpiredError < StandardError; end
    string :token
    outputs :user

    protected

    def perform
      parsed_token = attempt_to_parse_token(token)

      errors.add(:base, 'Token invalid') unless parsed_token.is_a?(Array)

      claims = parsed_token.first
      user = find_user(claims['data'])
      verify_jti(user, claims['jti'])
      output :user, user
    end

    def find_user(user_id)
      User.find(user_id)
    end

    def verify_jti(user, jti)
      errors.add(:base, 'Token invalid') unless user.valid_jti?(jti)
    end

    def attempt_to_parse_token(token)
      s = ENV['JWT_SECRET_KEY']
      a = ENV['JWT_ALGORITHM']

      begin
        JWT.decode(token, s, a)
      rescue JWT::ExpiredSignature
        raise TokenExpiredError, 'Token Expired'
      end
    end
  end
end
