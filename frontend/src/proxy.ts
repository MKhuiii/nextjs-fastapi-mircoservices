import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // 1. Lấy token từ Cookie ra kiểm tra
    const authLogin = request.cookies.get('user_auth')?.value

    const { pathname } = request.nextUrl

    // 2. Định nghĩa các trang bắt buộc phải đăng nhập mới được xem 
    const isProtectedRoute = pathname.startsWith('/manage') || pathname.startsWith('/profile')

    // 3. Nếu vào trang bảo mật mà KHÔNG CÓ token -> Chuyển hướng về trang đăng nhập
    if (isProtectedRoute && !authLogin) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // 4. Nếu đã ĐĂNG NHẬP RỒI mà cố tình vào lại trang `/login` hoặc `/register` -> Đá sang `/manage`
    if ((pathname === '/login' || pathname === '/register') && authLogin) {
        const managedUrl = new URL('/manage', request.url)
        return NextResponse.redirect(managedUrl)
    }

    return NextResponse.next()
}

// 5. Cấu hình các đường dẫn mà Middleware này sẽ quét qua (Bỏ qua các file tĩnh, hình ảnh)
export const config = {
    matcher: ['/manage/:path*', '/profile/:path*', '/login', '/register'],
}