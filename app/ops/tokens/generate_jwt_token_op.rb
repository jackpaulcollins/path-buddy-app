# frozen_string_literal: true

module Tokens
  class GenerateJwtTokenOp < BaseOp
    association :user
    outputs :token

    protected

    def perform
      token = generate_jwt_token(user)
      output :token, token
    end

    def generate_jwt_token(user)
      exp_payload = { data: user.id, jti: user.jti, exp: System::JWT_TOKEN_EXPIRY_TIME }
      s = ENV['JWT_SECRET_KEY']
      a = ENV['JWT_ALGORITHM']
      JWT.encode exp_payload, s, a
    end
  end
end
