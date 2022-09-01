class Event < ApplicationRecord
    belongs_to :calendar
    enum status: [ :Confirmed, :Tentative, :Canceled ]
end
