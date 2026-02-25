// app/api/upload-avatar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/user.model";
import { ConnectDB } from "@/lib/ConnectDB";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await ConnectDB(); // Ensure DB connection

    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decoded.userId)
      return NextResponse.json({ error: "Invalid payload" }, { status: 401 });

    const userId = decoded.userId;

    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    if (!file.type.startsWith("image/"))
      return NextResponse.json(
        { error: "Only images allowed" },
        { status: 400 },
      );

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE)
      return NextResponse.json({ error: "File too large" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3️⃣ Upload to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `users/${userId}/avatar`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          },
        )
        .end(buffer);
    });


    console.log(result);
    
    await User.findByIdAndUpdate(
      userId,
      { avatar: result.url },
      { new: true },
    );

    // 5️⃣ Return minimal response
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
