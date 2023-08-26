# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < ApplicationController
        def create; end

        private

        def session_params
          params.require(:user).permit(:email, :password)
        end
      end
    end
  end
end
