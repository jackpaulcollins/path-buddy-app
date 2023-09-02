# frozen_string_literal: true

module Api
  module V1
    module Tokens
      class TokensController < ApplicationController
        def verify
          op = ::Tokens::VerifyJwtTokenOp.submit!(token: token_params)

          verified = op.verification_status

          render json: { verified: }, status: :ok
        end

        private

        def token_params
          params.require(:token)
        end
      end
    end
  end
end
