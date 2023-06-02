function send_whatsapp(){
    var botId = '104139039369000';
    var phoneNbr = '573026055289';
    var bearerToken = 'EAAH55QLPNwcBAFNLRYfLPvqP2iIONW3eqqJZCgCeI4ACbe4pqgeTOKI6bm18m91ax1RSkj6Qlqh8xKzdsjD49kuvPYoeBZCM42o4MbtYQhCtVTYqTztsaoM5NhyhZCDZCfi0G5VqADLJ8sb94KuDVpc5nMfZC4Ei8pZBIAV42FRKZAvxdwtE4lFY85ZCUIaiyVf0gv5x3ccYyAZDZD';
    
    var url = 'https://graph.facebook.com/v16.0/' + botId + '/messages';
    var data = {
      messaging_product: 'whatsapp',
      to: phoneNbr,
      type: 'template',
      template: {
        name:'hello_world',
        language:{ code: 'en_US' }
      }
    };
    
    var postReq = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      json: true
    };
    
    fetch(url, postReq)
      .then(data => {
        return data.json()
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error));
    }

    


//"messaging_product": "whatsapp", "to": "", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }