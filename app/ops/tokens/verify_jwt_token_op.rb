# frozen_string_literal: true
module Tokens
  class VerifyJwtTokenOp < BaseOp
    string :token
    outputs :verification_status

    protected

    def perform
      claims = parse_token(token).first
      verification_status = find_user_and_verify_jti(claims)
      output :verification_status, verification_status
    end

    def parse_token(token)
      s = ENV['JWT_SECRET_KEY']
      a = ENV['JWT_ALGORITHM']
      claims = JWT.decode token, s, a
    end

    def find_user_and_verify_jti(claims)
      user = User.find(claims["data"])
      user.valid_jti?(claims["jti"])
    end
  end
end
