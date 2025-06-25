export async function onRequest(context) {
  const auth = context.request.headers.get('Authorization');

  if (!auth) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"'
      }
    });
  }

  const [scheme, encoded] = auth.split(' ');

  if (!encoded || scheme !== 'Basic') {
    return new Response('Invalid authentication', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"'
      }
    });
  }

  const decoded = atob(encoded);
  const [username, password] = decoded.split(':');

  const VALID_USERNAME = 'user';
  const VALID_PASSWORD = 'password';

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return new Response('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"'
      }
    });
  }

  return context.next();
}
