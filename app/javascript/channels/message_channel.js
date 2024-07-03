import consumer from "./consumer"

if(location.pathname.match(/\/rooms\/\d/)){
  

  consumer.subscriptions.create({
    channel: "MessageChannel",
    room_id: location.pathname.match(/\d+/)[0]
  }, {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      console.log('Received data:', data);
      console.log('current_user_id:', data.current_user_id);
      console.log('message user id:', data.user.id);
      console.log(data.image_url);

      const date = new Date(data.message.created_at);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hour = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${year}/${month}/${day} ${hour}:${minutes}`

      const isCurrentUser = parseInt(data.current_user_id) === parseInt(data.user.id);
      console.log('isCurrentUser:', isCurrentUser);

      const html = `
        <div class="message_${isCurrentUser ? 'me' : 'other'}">
          <div class="upper-message">
            <div class="message-user${isCurrentUser ? '' : '_other'}">
              ${ data.user.nickname }
            </div>
          </div>
          <div class="lower-message">
            <div class="message-content">
              ${ data.message.content }
            </div>
            ${data.image_url ? `<div class="message-images"><img src="${data.image_url}" class="message-image" /></div>` : ''}
            <div class="message-date">
              ${ formattedDate }
            </div>
          </div>
        </div>`;

      const messages = document.getElementById("comments")
      messages.insertAdjacentHTML('beforeend', html)
      const messageForm = document.getElementById("message-form")
      messageForm.reset();
      messages.scrollTop = messages.scrollHeight;
    }
  })
}