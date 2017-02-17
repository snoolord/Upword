export const fetchSynonyms = (word) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://wordsapiv1.p.mashape.com/words/${word}/synonyms`, true);
  xhr.setRequestHeader("X-Mashape-Authorization", "IMizT6DTnnmshliARTVBobREMUGSp1lso1vjsn2NRaBMcrtbAh");
  xhr.onload = function (data) {
    let response = JSON.parse(data.target.response);
    // chrome.storage.sync.set({[synonyms.word]: synonyms.synonyms})
    return response
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}
