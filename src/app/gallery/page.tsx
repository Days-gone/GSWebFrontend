'use client';

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Gallery() {
  const rockSlices = [
    { id: 1, title: '花岗岩切片 1', src: '/images/rock1.jpg' },
    { id: 2, title: '石英岩切片 1', src: '/images/rock2.jpg' },
    { id: 3, title: '玄武岩切片 1', src: '/images/rock1.jpg' },
    { id: 4, title: '花岗岩切片 2', src: '/images/rock2.jpg' },
    { id: 5, title: '石英岩切片 2', src: '/images/rock1.jpg' },
    { id: 6, title: '玄武岩切片 2', src: '/images/rock2.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation Bar */}
      <Navbar className="bg-white shadow-md" isBordered>
        <NavbarBrand>
          <Link href="/" className="text-2xl font-bold text-gray-900">
            岩石切片
          </Link>
        </NavbarBrand>
        <NavbarContent className="gap-6" justify="end">
          <NavbarItem isActive>
            <Button
              as={Link}
              href="/gallery"
              className="text-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Gallery
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="/upload"
              className="text-lg bg-gray-200 text-gray-900 hover:bg-gray-300"
            >
              Upload
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Gallery Section */}
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