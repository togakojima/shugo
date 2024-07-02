class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.string :roomname,     null: false
      t.string :password_digest

      t.timestamps
    end
  end
end
