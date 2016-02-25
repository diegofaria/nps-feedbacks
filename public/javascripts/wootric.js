// Duplicate this file and rename to wootric.js
const wootric = {
  clientId: 'b06d6ae2c1eb724dcf6de17643c5f8b883d0387f174ad55a5969eaaa22bfddd9',
  clientSecret: '0e6d4b8964eae6c8b9badb33a85e94e0c75ee4dc24d5d6bca9ffd78b617378e9',
  authUrl: 'https://api.wootric.com/oauth/token',
  responsesUrl: 'https://api.wootric.com/v1/responses'
}

wootric['credentials'] = {
    grant_type: 'client_credentials',
    client_id: wootric.clientId,
    client_secret: wootric.clientSecret
}

wootric['accessToken'] = ''
