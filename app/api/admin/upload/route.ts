import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // In local/demo mode, return a reliable placeholder URL or uploaded preview
    const sampleUrls = [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    ];
    const publicUrl = sampleUrls[Math.floor(Math.random() * sampleUrls.length)];

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: file.name,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
