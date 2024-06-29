class Room < ApplicationRecord
  has_secure_password

  has_many :room_users, dependent: :destroy
  has_many :users, through: :room_users

  validates :roomname, presence: true
end
