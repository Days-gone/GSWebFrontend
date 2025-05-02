'use client';

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { rockSlices } from "@/app/lib/dataplaceholder";

export default function Gallery() {
  const rockslices = rockSlices;

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Gallery Section */}
      <section className="py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          岩石切片画廊
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[96%] mx-auto">
          {rockslices.map((slice) => (
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
                  <Image
                    src={slice.src}
                    alt={slice.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}