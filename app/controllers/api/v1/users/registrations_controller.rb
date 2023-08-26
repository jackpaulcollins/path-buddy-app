# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < ApplicationController
        respond_to :json

        private

        def sign_up_params
          params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
        end
      end
    end
  end
end
