Rails.application.routes.draw do
  devise_for :users
  root to: "messages#index"
  resources :users, only: [:edit, :update, :show]
  resources :rooms, only: [:new, :create]
end
