document.addEventListener("turbo:load", function() {
  const messages = document.getElementById('comments');
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
});