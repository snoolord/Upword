function clearCache() {
  console.log("clearCache");
  chrome.storage.sync.clear();
}

document.getElementById('clear-cache').addEventListener('click', clearCache);
