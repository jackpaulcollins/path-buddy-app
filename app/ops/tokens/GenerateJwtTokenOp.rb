module Tokens
  class GenerateJwtTokenOp < ::Subroutine::Op
    integer :user_id
    outputs :token

    protected

    def perform
      token = generate_jwt_token(user_id)
      output :token, token
    end

    def generate_jwt_token(user_id)
      exp_payload = { data: user_id, exp: System::JWT_TOKEN_EXPIRY_TIME }
      a = ENV['JWT_ALGORITHM']
      s = ENV['JWT_SECRET_KEY']
      JWT.encode exp_payload, s, a
    end
  end
end