class FixColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :name, :description
  end
end
