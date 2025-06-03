import { SliceImgCardData } from '@/app/lib/types';
import { MetricData, SliceCardData } from '@/app/lib/types';

export const rockSlices = [
  { id: 1, title: '花岗岩切片 1', src: '/images/rock1.jpg' },
  { id: 2, title: '石英岩切片 1', src: '/images/rock2.jpg' },
  { id: 3, title: '玄武岩切片 1', src: '/images/rock1.jpg' },
  { id: 4, title: '花岗岩切片 2', src: '/images/rock2.jpg' },
  { id: 5, title: '石英岩切片 2', src: '/images/rock1.jpg' },
  { id: 6, title: '玄武岩切片 2', src: '/images/rock2.jpg' },
];

export const detailData: SliceImgCardData = {
  uuid: 1,
  title: '花岗岩切片 1',
  imgUrls: [
    '/images/rock1.jpg',
    '/images/rock2.jpg',
    '/images/rock1.jpg',
    '/images/rock2.jpg',
  ]
}

export const metricdata: SliceCardData = {
  title: '碳酸盐岩石切片',
  description: '这是一块碳酸盐岩石切片，其中包含了丰富的矿物质和纹理特征。标本样本来自成都理工大学毕业生提供的演示切片资源。',
  metric1: {
    name: '处理时间 (ms)',
    values: [120, 200],
  },
  metric2: {
    name: '内存占用 (MB)',
    values: [50, 60, 55, 70, 65],
  },
  categories: ['切片1', '切片2'],
};