class AddCalendarIdToEvent < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :calendar_id, :integer
  end
end
