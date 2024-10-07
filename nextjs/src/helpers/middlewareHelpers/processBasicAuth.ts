import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function processBasicAuth(
  req: NextRequest,
  username: string,
  password: string,
): NextResponse | null {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

    if (user !== username || pwd !== password) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  } else {
    return new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return null;
}
