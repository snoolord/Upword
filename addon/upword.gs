function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  var ui = HtmlService.createTemplateFromFile('upword').evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('UPWORD');
  DocumentApp.getUi().showSidebar(ui);
}

function getPreferences() {
  var userProperties = PropertiesService.getUserProperties();
  var languagePrefs = {
    originLang: userProperties.getProperty('originLang'),
    destLang: userProperties.getProperty('destLang')
  };
  return languagePrefs;
}

// Helper function that puts external JS / CSS into the HTML file.
// Not sure if needed
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}

function getSelectedWord() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var text = [];
    var elements = selection.getSelectedElements();
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPartial()) {
        // console.log(element[i].isPartial());
        var element = elements[i].getElement().asText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive();
        text.push(element.getText().substring(startIndex, endIndex + 1));
      } else {
        var element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip images and
        // other non-text elements.
        if (element.editAsText) {
          var elementText = element.asText().getText();
          // This check is necessary to exclude images, which return a blank
          // text element.
          if (elementText != '') {
            text.push(elementText);
          }
        }
      }
    }
    if (text.length == 0) {
      throw 'Please select some text.';
    } else if (text.length > 1) {
      throw 'Too many word, please select just one word';
    }
    return text;
  } else {
    throw 'Please select some text.';
  }
}


function insertText(newText) {
  var newWordLength = newText.length;
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var elements = selection.getSelectedElements();
    if (elements.length == 1 &&
        elements[0].getElement().getType() ==
        DocumentApp.ElementType.INLINE_IMAGE) {
      throw "Can't insert text into an image.";
    }
    var rangebuilder = DocumentApp.getActiveDocument().newRange();
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPartial()) {
        var element = elements[i].getElement().asText();
        var startIndex = elements[i].getStartOffset();
        var endIndex = elements[i].getEndOffsetInclusive();

        var remainingText = element.getText().substring(endIndex + 1);
        element.deleteText(startIndex, endIndex);
        element.insertText(startIndex, newText);
        var endNewIndex = startIndex + newWordLength - 1;
        rangebuilder.addElement(element, startIndex, endNewIndex)
      }
    }
    DocumentApp.getActiveDocument().setSelection(rangebuilder.build());
  }
}
