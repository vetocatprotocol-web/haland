import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role as string | undefined;
  const isStaffRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
  const isCustomerRoute = pathname === '/portal' || pathname.startsWith('/portal/');

  if (!token) {
    if (isStaffRoute || isCustomerRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  if (isStaffRoute) {
    if (!['OWNER', 'ADMIN_KLINIK', 'DOKTER'].includes(role ?? '')) {
      return NextResponse.redirect(new URL('/portal', request.url));
    }

    return NextResponse.next();
  }

  if (isCustomerRoute) {
    if (role !== 'CUSTOMER') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/portal/:path*'],
};
