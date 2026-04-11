import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse, v2 } from 'cloudinary';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@/models/user.model';
import { ConnectDB } from '@/lib/ConnectDB';
import { getUser } from '@/lib/getUser';
import bcrypt from 'bcryptjs';

import {uid} from "uid"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await ConnectDB(); // Ensure DB connection

    const token = req.cookies.get('token')?.value;
    if (!token)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!decoded.userId)
      return NextResponse.json({ error: 'Invalid payload' }, { status: 401 });

    const userId = decoded.userId;
    const user = await getUser(userId);
    const data = await req.formData();
    const file = data.get('file') as File | null;

    if (!file)
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    if (!file.type.startsWith('image/'))
      return NextResponse.json(
        { error: 'Only images allowed' },
        { status: 400 }
      );

    const MAX_SIZE = 5 * 1024 * 1024; 
    if (file.size > MAX_SIZE)
      return NextResponse.json({ error: 'File too large' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    if(user.cloudineryimagePublicid){

      cloudinary.uploader.destroy(user.cloudineryimagePublicid, (error:any, result: any) => {
        if (error) console.error('Error deleting old image:', error);
        else console.log('Old image deleted:', result);
      });
    }

    const uniqeid = uid(20)
    
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `users/${userId}/avatar`,
            resource_type: 'image',
            public_id: uniqeid,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        )
        .end(buffer);
    });

    await User.findByIdAndUpdate(
      userId,
      { avatar: result.url, cloudineryimagePublicid: result.public_id },
      { new: true }
    );

    return NextResponse.json({ url: result.secure_url });
  } catch (error : any) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

