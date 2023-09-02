# frozen_string_literal: true

module Tokens
  class VerifyJwtTokenOp < BaseOp
    string :token
    outputs :verification_status

    protected

    def perform
      if (token_claims_or_expired_message = attempt_to_parse_token(token))
        claims = token_claims_or_expired_message.first
        verification_status = find_user_and_verify_jti(claims)
      else
        verification_status = token_claims_or_expired_message
      end
      output :verification_status, verification_status
    end

    def attempt_to_parse_token(token)
      s = ENV['JWT_SECRET_KEY']
      a = ENV['JWT_ALGORITHM']
      JWT.decode token, s, a
    rescue JWT::ExpiredSignature
      false
    end

    def find_user_and_verify_jti(claims)
      user = User.find(claims['data'])
      user.valid_jti?(claims['jti'])
    end
  end
end
