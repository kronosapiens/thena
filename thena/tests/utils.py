from httmock import response, urlmatch

@urlmatch(netloc=r'(.*\.)googleapis\.com$', path='/userinfo/email')
def google_auth(url, request):
    access_token = url.query.split('access_token=')[-1]
    if access_token:
        content = {
            'data': {
                'email': 'test@thena.io',
                'isVerified': True
                }
            }
    else:
        content = {
            'error': {
                'code': 401,
                'message': 'Login Required',
                'errors': [{
                    'locationType': 'header',
                    'domain': 'global',
                    'message': 'Login Required',
                    'reason': 'required',
                    'location': 'Authorization'
                    }]
                }
            }

    headers = {'content-type': 'application/json'}
    return response(200, content, headers, None, 2, request)