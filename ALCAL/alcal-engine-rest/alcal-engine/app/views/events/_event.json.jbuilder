json.extract! event, :id, :name, :calendar_id, :creator_id, :owner_id, :startDateTime, :endDateTime, :status, :created_at, :updated_at
json.url event_url(event, format: :json)
