module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        def create
          build_resource(sign_up_params)
          resource.save
          if resource.save
            render json: { user: resource  }
          else
            render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
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