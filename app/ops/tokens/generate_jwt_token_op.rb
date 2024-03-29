# frozen_string_literal: true

require 'subroutine/association_fields'

module Tokens
  class GenerateJwtTokenOp < BaseOp
    include ::Subroutine::AssociationFields
    association :user
    outputs :token

    protected

    def perform
      token = generate_jwt_token(user)
      output :token, token
    end

    def generate_jwt_token(user)
      exp_payload = { data: user.id, jti: user.jti, exp: Time.now.to_i + 4 * 3600 }
      s = ENV['JWT_SECRET_KEY']
      a = ENV['JWT_ALGORITHM']
      JWT.encode exp_payload, s, a
    end
  end
end
