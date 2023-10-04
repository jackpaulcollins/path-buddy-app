# frozen_string_literal: true

module Api
  module V1
    module Tokens
      class TokensController < ApplicationController
        def verify
          op = ::Tokens::JwtTokenExchangeOp.submit!(token: token_params)

          if op.user.present?
            render json: { verified: true, status: 200 }
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
