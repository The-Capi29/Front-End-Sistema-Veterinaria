var xhr = new XMLHttpRequest();
xhr.open('GET', "https://webchat.botframework.com/api/tokens", true);
xhr.setRequestHeader('Authorization', 'BotConnector ' + 'eLMZHiFyiMo.NHQ3fBHp_OdJIzL9fFWoKsjknvIOtSpYh-k8KBW9rsA');
xhr.send();
xhr.onreadystatechange = processRequest;

function processRequest(e) {
  if (xhr.readyState == 4  && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    document.getElementById("chat").src="https://webchat.botframework.com/embed/botzeuz?t="+response;
  }
}