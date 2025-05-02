'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react';
import Image from 'next/image';
import * as echarts from 'echarts';

export default function SliceDetail() {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState('ori');
  const chartRef = useRef<HTMLDivElement>(null);

  // Mock data for the slice (replace with API call in production)
  const sliceData = {
    id: id as string,
    title: `岩石切片 ${id}`,
    description: '这是一块典型的花岗岩切片，含有石英、长石和云母等矿物，采集自某地质区域。',
    images: {
      ori: `/images/ori${id}.jpg`,
      glcm: `/images/glcm${id}.jpg`,
      cam: `/images/cam${id}.jpg`,
    },
    composition: [
      { name: '石英', value: 40 },
      { name: '长石', value: 35 },
      { name: '云母', value: 20 },
      { name: '其他', value: 5 },
    ],
  };

  // Initialize ECharts
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        title: { text: '矿物成分比例', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: sliceData.composition,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });

      return () => {
        chart.dispose();
      };
    }
  }, [sliceData.composition]);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Left Card (3/4 width) */}
          <Card className="w-full md:w-3/4 bg-white border-gray-200 shadow-xl">
            <CardBody className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Tabs
                  selectedKey={viewMode}
                  onSelectionChange={(key) => setViewMode(key as string)}
                  color="primary"
                  variant="bordered"
                  className="w-64"
                >
                  <Tab key="ori" title="ORI" />
                  <Tab key="glcm" title="GLCM" />
                  <Tab key="cam" title="CAM" />
                </Tabs>
              </div>
              <div className="relative w-full h-[500px]">
                <Image
                  src={sliceData.images[viewMode as keyof typeof sliceData.images]}
                  alt={sliceData.title}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            </CardBody>
          </Card>

          {/* Right Column (1/4 width) */}
          <div className="w-full md:w-1/4 flex flex-col gap-6">
            {/* Description Card */}
            <Card className="bg-white border-gray-200 shadow-xl">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-gray-900">{sliceData.title}</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700">{sliceData.description}</p>
              </CardBody>
            </Card>

            {/* Chart Card */}
            <Card className="bg-white border-gray-200 shadow-xl flex-1">
              <CardBody>
                <div ref={chartRef} className="w-full h-64" />
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}