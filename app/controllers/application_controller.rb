# frozen_string_literal: true

require 'subroutine/association_fields'

class ApplicationController < ActionController::API
  def append_token_to_response(token)
    response.set_header('Authorization', "Bearer #{token}")
  end

  def validate_user!
    match_data = request.headers['Authorization'].match(/^Bearer\s+(.+)$/)

    return unauthorized! unless match_data

    token = match_data[1]
    Tokens::JwtTokenExchangeOp.submit!(token: token).user
  end

  def unauthorized!
    render json: { error: 'Token expired' }, status: :forbidden
  end
end
