class Event < ApplicationRecord
    enum status: [ :Confirmed, :Tentative, :Canceled ]
end
