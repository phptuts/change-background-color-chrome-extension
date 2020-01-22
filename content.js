window.onload = function() {
  chrome.storage.sync.get('color', function(data) {
    if (data.color !== 'clear') {
      document.querySelector('body').style.backgroundColor =
        data.color || 'red';
    } else {
      document.querySelector('body').style.backgroundColor = null;
    }
  });

  chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    if (message.color !== 'clear') {
      document.querySelector('body').style.backgroundColor = message.color;
    } else {
      document.querySelector('body').style.backgroundColor = null;
    }
  });
};
