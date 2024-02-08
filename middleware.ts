import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });
  if (token) {
    return NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.rewrite(url);
  }
};

export const config = {
  matcher: "/dashboard/:path*",
};
