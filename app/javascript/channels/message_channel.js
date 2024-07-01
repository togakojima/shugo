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
      console.log(data)
      const html = `
      <div class="message_me">
        <div class="upper-message">
          <div class="message-user">
            ${ data.user.nickname }
          </div>
        </div>
        <div class="lower-message">
          <div class="message-content">
            ${ data.message.content }
          </div>
          <div class='message-images'>
          </div>
          <div class="message-date">
            ${ data.message.created_at }
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