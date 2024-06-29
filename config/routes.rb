Rails.application.routes.draw do
  devise_for :users
  root to: "rooms#index"
  resources :users, only: [:edit, :update, :show]
  resources :rooms, only: [:new, :create] do
    member do
      post :join
    end
    resources :messages, only: [:index, :create]
  end
end
