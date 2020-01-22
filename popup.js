document
  .getElementById('color_picker')
  .addEventListener('change', function(event) {
    const color = document.getElementById('color_picker').value;
    document.getElementById('change_color').style.backgroundColor = color;
    document.querySelector('#color_hex').innerHTML = color;
  });

document.getElementById('clear_btn').addEventListener('click', function() {
  document.getElementById('change_color').style.backgroundColor = '#ffffff';
  document.querySelector('#color_hex').innerHTML = 'clear';
  saveAndChangeColor('clear');
});

document
  .getElementById('change_color_btn')
  .addEventListener('click', function() {
    const color = document.getElementById('color_picker').value;
    saveAndChangeColor(color);
  });

function saveAndChangeColor(color) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { color }, function(response) {
      chrome.storage.sync.set({ color }, function(data) {
        var notifOptions = {
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'Color Saved!',
          message: 'Color was saved and changed!'
        };
        chrome.notifications.create(
          'savedColor' + new Date().getTime(), // Id must be unique for every notification
          notifOptions
        );
      });
    });
  });
}

chrome.storage.sync.get('color', function(data) {
  const color = data.color || '#ff0000';
  document.querySelector('input').value = color;
  document.getElementById('change_color').style.backgroundColor = color;
  document.querySelector('#color_hex').innerHTML = color;
});
