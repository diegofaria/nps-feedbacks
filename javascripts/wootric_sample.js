// Duplicate this file and rename to wootric.js
const wootric = {
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  authUrl: 'https://api.wootric.com/oauth/token',
  responsesUrl: 'https://api.wootric.com/v1/responses'
}

wootric['credentials'] = {
    grant_type: 'client_credentials',
    client_id: wootric.clientId,
    client_secret: wootric.clientSecret
}

wootric['accessToken'] = ''