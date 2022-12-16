import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { verify } from './services/jwt_sign_verify'
export default async function middleware(req) {
  const secret = process.env.SECRET

  let jwt = req.cookies.get('OursiteJWT')
  let url = req.url

  // online domain for heroku
  const domain = process.env.CUSTOM_EMAIL

  // offline domain for localhost
  // const domain = "http://localhost:3000/";
  // console.log(verifys);

  let tmp_url = url
  let pathname = '/' + tmp_url.replace(domain, '')

  try {
    const res = await verify(jwt, secret)
    if (jwt) {
      // console.log(res.role)
      if (res.role != 'customer') {
        if (pathname == '/role/auth') {
          if (res.role == 'administrator') {
            return NextResponse.redirect(`${domain}admin`)
          } else if (res.role == 'manager') {
            return NextResponse.redirect(`${domain}manager/rooms`)
          } else if (res.role == 'supervisor') {
            return NextResponse.redirect(`${domain}housekeeping/rooms`)
          } else {
            return NextResponse.redirect(`${domain}receptionist/book`)
          }
        }
      }
      switch (pathname) {
        case '/admin/guests':
        case '/admin':
        case '/admin/manager':
        case '/admin/supervisor':
        case '/admin/staff_receptionist':
        case '/admin/guest_attendants':
        case '/admin/housekeeping':
        case '/admin/guards':
        case '/admin/administrator':
        case '/admin/rooms':
        case '/admin/reservation_reports':
        case '/admin/payment_reports':
        case '/admin/cancellation_reports':
        case '/admin/voucher':
        case '/admin/room_reports':
        case '/admin/cleaner_reports':
        case '/admin/task_reports':
          if (res.role == 'administrator') {
            return NextResponse.next()
          } else {
            return NextResponse.redirect(`${domain}role/auth`)
          }
        case '/manager/rooms':
        case '/manager/reserved_list':
        case '/manager/requested_list':
        case '/manager/cancelled_list':
        case '/manager/housekeepings':
        case '/manager/calendar':
          if (res.role == 'manager') {
            return NextResponse.next()
          } else {
            return NextResponse.redirect(`${domain}role/auth`)
          }
        case '/receptionist/book':
        case '/receptionist/reserved_list':
        case '/receptionist/reservation_status':
          if (res.role == 'receptionists') {
            return NextResponse.next()
          } else {
            return NextResponse.redirect(`${domain}role/auth`)
          }
        case '/housekeeping/rooms':
        case '/housekeeping/housekeepings':
        case '/housekeeping/calendar':
          if (res.role == 'supervisor') {
            return NextResponse.next()
          } else {
            return NextResponse.redirect(`${domain}role/auth`)
          }
        case '/customer/reservation':
        case '/customer/settings/profile':
        case '/customer/settings/password':
        case '/customer/settings/help':
          console.log(res)
          if (res.role == 'customer') {
            return NextResponse.next()
          } else {
            return NextResponse.redirect(`${domain}customer`)
          }
        default:
          if (
            pathname.includes('/customer/payment') &&
            res.role != 'customer'
          ) {
            return NextResponse.redirect(`${domain}customer`)
          } else {
            return NextResponse.next()
          }
      }
    } else {
      switch (pathname) {
        case '/admin/guests':
        case '/admin':
        case '/admin/manager':
        case '/admin/supervisor':
        case '/admin/staff_receptionist':
        case '/admin/guest_attendants':
        case '/admin/housekeeping':
        case '/admin/guards':
        case '/admin/rooms':
        case '/admin/reservation_reports':
        case '/admin/payment_reports':
        case '/admin/cancellation_reports':
        case '/admin/voucher':
        case '/admin/room_reports':
        case '/admin/cleaner_reports':
        case '/admin/task_reports':
        case '/receptionist/book':
        case '/receptionist/reserved_list':
        case '/receptionist/reservation_status':
        case '/housekeeping/rooms':
        case '/housekeeping/housekeepings':
        case '/housekeeping/calendar':
        case '/manager/rooms':
        case '/manager/reserved_list':
        case '/manager/requested_list':
        case '/manager/cancelled_list':
        case '/manager/housekeepings':
        case '/manager/calendar':
          return NextResponse.redirect(`${domain}role/auth`)
      }
    }
  } catch (e) {}

  // configuration
  if (req.nextUrl.pathname.startsWith('/_next')) return NextResponse.next()
  if (
    pathname.startsWith('/_next') || // exclude Next.js internals
    pathname.startsWith('/api') || //  exclude all API routes
    pathname.startsWith('/static') || // exclude static files
    pathname.includes('.') // exclude all files in the public folder
  )
    return NextResponse.next()

  const PUBLIC_FILE = /\.(.*)$/
  if (PUBLIC_FILE.test(pathname)) return NextResponse.next()
  // if (!verifys) {
  //
  // }
}
