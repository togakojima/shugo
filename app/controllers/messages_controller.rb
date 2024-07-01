class MessagesController < ApplicationController
  def index
    @rooms = Room.all
    @message = Message.new
    @room = Room.find(params[:room_id])
    @messages = @room.messages.includes(:user)
  end

  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.new(message_params)
    @message.save
    if @message.save
      MessageChannel.broadcast_to @room, { 
      message: @message, user: @message.user, 
      current_user_id: current_user.id, 
      image_url: @message.image.attached? ? url_for(@message.image) : nil}
    else
      @messages = @room.messages.includes(:user)
      render :index, status: :unprocessable_entity, alert: "Message could not be sent"
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
end
