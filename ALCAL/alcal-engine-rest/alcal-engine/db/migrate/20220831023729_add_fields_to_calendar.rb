class AddFieldsToCalendar < ActiveRecord::Migration[7.0]
  def change
    add_column :calendars, :owner_id, :integer
    add_column :calendars, :name, :string
  end
end
