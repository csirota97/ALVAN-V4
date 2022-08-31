Rails.application.routes.draw do
  get 'events/calendar'
  get 'events/user'
  resources :events
  resources :calendars
  resources :users
  get 'welcome/index'
  root 'welcome#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
