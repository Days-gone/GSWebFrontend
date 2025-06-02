'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    // Hero Section Animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    // Gallery Items Animation
    gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.2,
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rock1.jpg"
            alt="Rock Slice Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">
            探索岩石切片之美
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            发现地质奇观，体验岩石切片的微观世界
          </p>
          <Link
            href="/gallery"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            浏览切片库
          </Link>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section ref={galleryRef} className="py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">精选切片</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { src: '/images/rock1.jpg', title: '花岗岩切片' },
            { src: '/images/rock2.jpg', title: '石英岩切片' },
            { src: '/images/rock3.png', title: '玄武岩切片' },
          ].map((item, index) => (
            <div
              key={index}
              className="gallery-item relative group overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-center">
        <h2 className="text-3xl font-bold mb-4">加入我们的地质探险</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          订阅以获取最新岩石切片资讯和独家内容
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="输入您的邮箱"
            className="py-2 px-4 rounded-l-full text-black focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-r-full">
            订阅
          </button>
        </div>
      </section>
    </div>
  );
}