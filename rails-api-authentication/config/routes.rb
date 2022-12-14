Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create, :index]
  resources :posts #, only: [:create, :index, :show, :update, :delete]
  resources :users
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root to: "static#home"
end
