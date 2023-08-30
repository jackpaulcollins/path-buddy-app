Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'users/', to: 'users/registrations#create'
      post 'users/sign_in', to: 'users/sessions#create'
      delete 'users/sign_out', to: 'users/sessions#destroy'

      post 'tokens/verify', to: 'tokens/tokens#verify'
      post 'tokens/token', to: 'tokens/tokens#refresh'
    end
  end
end
