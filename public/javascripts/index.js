var page = 0
const detractors = []
const promoters = []
var firstResponseArrived = false

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
        data: {access_token: wootric.accessToken, page: ++page},
        success: function(responses){
            if (page === 1)
                showResponses()
            if (responses.length != 0)
                getResponses()
            classifyResponses(responses)
        }
    })
}

function classifyResponses(responses) {
    jQuery.each(responses, function(index, response) {
        if (response.text != null) {
            if (response.score >= 0 && response.score <= 6){
                detractors.push(response)
            }
            else if (response.score >= 9){
                promoters.push(response)
            }
        }
    })
}

function showResponses() {
    const showResponsesFunctions = [showDetractors, showPromoters]
    setInterval(function(){
        var responseFunction = showResponsesFunctions.shift()
        showResponsesFunctions.push(responseFunction)
        responseFunction()
    }, 10000)
}

function showDetractors() {
    var detractor = detractors.pop()
    detractors.unshift(detractor)
    $('.js-responser-type').removeClass('promoter').addClass('detractor')
    $('.js-score').removeClass('promoter').addClass('detractor')
    $('.js-responser-type').text('DETRACTOR :/')
    updateInfos(detractor)
}

function showPromoters() {
    var promoter = promoters.pop()
    promoters.unshift(promoter)
    $('.js-responser-type').removeClass('detractor').addClass('promoter')
    $('.js-score').removeClass('detractor').addClass('promoter')
    $('.js-responser-type').text('PROMOTER :)')
    updateInfos(promoter)
}

function updateInfos(response) {
    $('.js-nps').show()
    $('.js-score').text(response.score)
    // $('.js-user').text("FALTA COLOCAR USER")
    $('.js-feedback').text(response.text)
    $('.js-details').text(response.origin_url)
}



