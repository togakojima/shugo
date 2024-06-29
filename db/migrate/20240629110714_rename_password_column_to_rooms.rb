class RenamePasswordColumnToRooms < ActiveRecord::Migration[7.0]
  def change
    rename_column :rooms, :password, :password_digest
  end
end
