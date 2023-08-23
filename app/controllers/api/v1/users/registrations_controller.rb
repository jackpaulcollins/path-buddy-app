module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        def sign_up_params
          params.require(:user).permit(:email, :time_zone :password, :password_confirmation)
        end
      end
    end
  end
end