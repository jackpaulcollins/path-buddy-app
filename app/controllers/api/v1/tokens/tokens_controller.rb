# frozen_string_literal: true

module Api
  module V1
    module Tokens
      class TokensController < ApplicationController
        def verify
          user = ::Tokens::JwtTokenExchangeOp.submit!(token: token_params).user

          if user.present?
            render json: { verified: true, user: user }, status: :ok
          else
            render json: { verified: false }, status: :forbidden
          end
        end

        private

        def token_params
          params.require(:token)
        end
      end
    end
  end
end
