module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        respond_to :json
      end
    end
  end
end