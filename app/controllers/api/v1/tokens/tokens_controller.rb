# frozen_string_literal: true

module Api
  module V1
    module Tokens
      class TokensController < ApplicationController
        def verify
          render json: { data: 'true' }
        end

        private

        def token_params
          params.require(:token)
        end
      end
    end
  end
end
