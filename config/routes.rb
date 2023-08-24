Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        tokens: 'api/v1/users/tokens',
        registrations: 'api/v1/users/registrations'
      }
    end
  end
end