class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.integer :created_by
      t.integer :owned_by
      t.datetime :startDateTime
      t.datetime :endDateTime
      t.integer :status

      t.timestamps
    end
  end
end
