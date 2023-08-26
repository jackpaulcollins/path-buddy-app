# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        include RackSessionFix
        respond_to :json

        def respond_with(resource, _opts = {})
          if request.method == 'POST' && resource.persisted?
            render json: {
              status: { code: 200, message: 'Signed up sucessfully.' },
              data: { user: resource.email }
            }, status: :ok
          elsif request.method == 'DELETE'
            render json: {
              status: { code: 200, message: 'Account deleted successfully.' }
            }, status: :ok
          else
            render json: {
              status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
            }, status: :unprocessable_entity
          end
        end

        private

        def sign_up_params
          params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
        end
      end
    end
  end
end
