const clientId = 'CLIENT_ID'
const clientSecret = 'CLIENT_SECRET'
const authUrl = 'https://api.wootric.com/oauth/token'
const responsesUrl = 'https://api.wootric.com/v1/responses'
const credentials = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
}
var accessToken;

$.ajax({
    type: "POST",
    url: authUrl,
    data: credentials,
    success: function(data) {
      accessToken = data.access_token
      getResponses()
    }
})

var requests = 0
function getResponses() {
    console.log(requests)
    $.ajax({
        url: responsesUrl,
        data: {access_token: accessToken, page: ++requests},
        success: function(responses){

            if (responses.length != 0)
                getResponses()

            classifyResponses(responses)
        }
    })
}

const detractors = []
const promoters = []
function classifyResponses(responses) {
    jQuery.each(responses, function(index, response) {
        if(response.text != null) {
            if(response.score >= 0 && response.score <= 6) {
                detractors.push(response)
            } else if (response.score >= 8) {
                promoters.push(response)
            }
        }
    })
}
