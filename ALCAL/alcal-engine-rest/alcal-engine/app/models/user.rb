class User < ApplicationRecord
    has_many :calendars, dependent: :destroy
    has_many :events, dependent: :destroy, through: :calendars
end
