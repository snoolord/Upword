export const fetchWord = (word, success) => {
 $.ajax({
   url: `https://wordsapiv1.p.mashape.com/words/${word}/synonyms`,
   type: 'GET',
   data: {},
   dataType: 'json',
   success,
   beforeSend: function(xhr) {
     xhr.setRequestHeader("X-Mashape-Authorization", "IMizT6DTnnmshliARTVBobREMUGSp1lso1vjsn2NRaBMcrtbAh");
   }
 });
};
