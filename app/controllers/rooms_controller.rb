class RoomsController < ApplicationController
  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      RoomUser.create(user: current_user, room: @room)
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def join
    @room = Room.find(params[:id])
    if @room.authenticate(params[:password])
      RoomUser.create(user: current_user, room: @room)
      redirect_to @room
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def room_params
    params.require(:room).permit(:roomname, :password, :password_confirmation)
  end
end
