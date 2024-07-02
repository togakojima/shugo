const scroll = () => {
  const messages = document.getElementById('comments');
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
};

document.addEventListener("turbo:load", scroll);
window.addEventListener("turbo:render", scroll);