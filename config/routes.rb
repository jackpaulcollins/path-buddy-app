Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'users/sign_up', to: 'users/registrations#create'
      post 'users/sign_in', to: 'users/sessions#create'
      delete 'users/sign_out', to: 'users/sessions#destroy'
      post 'users/refresh_token', to: 'users/tokens#refresh'
    end
  end
end
