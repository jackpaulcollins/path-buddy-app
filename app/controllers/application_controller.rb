# frozen_string_literal: true

require 'subroutine/association_fields'

class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  def append_token_to_response(token)
    response.set_header('Authorization', "Bearer #{token}")
  end
end
