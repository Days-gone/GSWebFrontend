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
  id: 1,
  title: '花岗岩切片 1',
  imgUrls: [
    '/images/rock1.jpg',
    '/images/rock2.jpg',
    '/images/rock1.jpg',
    '/images/rock2.jpg',
  ]
}

export const metricdata: SliceCardData = {
  title: '网页切片功能分析',
  description: '网页切片功能允许用户快速分割和处理网页内容，提高数据处理效率。以下展示切片操作的性能指标。',
  metric1: {
    name: '处理时间 (ms)',
    values: [120, 200, 150, 180, 220],
  },
  metric2: {
    name: '内存占用 (MB)',
    values: [50, 60, 55, 70, 65],
  },
  categories: ['切片1', '切片2', '切片3', '切片4', '切片5'],
};