var page = 1
const detractors = []
const promoters = []

grantAccess()

function grantAccess() {
    $.ajax({
        type: "POST",
        url: wootric.authUrl,
        data: wootric.credentials,
        success: function(data) {
            wootric.accessToken = data.access_token
            getResponses()
        }
    })
}

function getResponses() {
    $.ajax({
        url: wootric.responsesUrl,
        data: {access_token: wootric.accessToken, page: page++},
        success: function(responses){
            if (responses.length != 0)
                getResponses()
            classifyResponses(responses)
        }
    })
}

function classifyResponses(responses) {
    jQuery.each(responses, function(index, response) {
        if (response.text != null) {
            if (response.score >= 0 && response.score <= 6)
                detractors.push(response)
            else if (response.score >= 8)
                promoters.push(response)
        }
    })
}
