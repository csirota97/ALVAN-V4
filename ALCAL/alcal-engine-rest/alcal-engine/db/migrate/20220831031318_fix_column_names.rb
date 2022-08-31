class FixColumnNames < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :owned_by, :owner_id
    rename_column :events, :created_by, :creator_id
  end
end
