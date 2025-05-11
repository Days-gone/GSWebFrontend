'use client';

import { Card, CardBody, CardHeader } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { getSliceList } from '@/app/lib/datafetch';
import { useState, useEffect } from 'react';
import type { GalleryItemData } from '@/app/lib/types';

export default function Gallery() {
  const [rockSlices, setRockSlices] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlices() {
      try {
        const slices = await getSliceList();
        console.log(slices);
        setRockSlices(slices);
      } catch (err) {
        setError('Failed to load rock slices');
      } finally {
        setLoading(false);
      }
    }
    fetchSlices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse bg-gray-200 w-64 h-64 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  console.log(rockSlices);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          岩石切片画廊
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[96%] mx-auto">
          {rockSlices.map((slice) => (
            <Card
              key={slice.id}
              className="bg-white border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full"
              isHoverable
              isPressable
              as={Link}
              href={`/gallery/${slice.id}`}
            >
              <CardHeader className="text-gray-900">
                <h3 className="text-2xl font-semibold">{slice.title}</h3>
              </CardHeader>
              <CardBody>
                <div className="relative w-full h-96">
                  <Image alt={slice.title} fill className="object-cover rounded-md" src={slice.imgUrl} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}