import { syncPrsService } from "@/app/api/_service/pullrequestsService";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const userInfo = await getToken({ req });

  await syncPrsService(userInfo?.sub as string);

  return NextResponse.json("Success", { status: 200 });
};
