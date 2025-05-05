'use client'

import React from 'react';
import { Card, CardBody, Divider } from '@heroui/react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';

// 注册 ECharts 所需的组件
echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

// 定义数据接口
interface MetricData {
  name: string;
  values: number[];
}

interface SliceCardData {
  title: string;
  description: string;
  metric1: MetricData;
  metric2: MetricData;
  categories: string[];
}

// 创建切片信息卡片组件
export default function SliceInfoCard({ data }: { data: SliceCardData }) {
  // ECharts 配置
  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: data.categories,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: data.metric1.name,
        type: 'bar',
        barWidth: '40%',
        data: data.metric1.values,
        itemStyle: {
          color: '#3b82f6',
        },
      },
      {
        name: data.metric2.name,
        type: 'bar',
        barWidth: '40%',
        data: data.metric2.values,
        itemStyle: {
          color: '#10b981',
        },
      },
    ],
  };

  return (
    <Card className="w-full max-w-2xl bg-white shadow-lg rounded-lg">
      <CardBody className="p-6">
        {/* 上半部分：文字介绍 */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{data.title}</h2>
          <p className="mt-2 text-gray-600">{data.description}</p>
        </div>
        {/* 分割线 */}
        <Divider className="my-4" />
        {/* 下半部分：ECharts 图表 */}
        <div className="h-64">
          <ReactECharts
            echarts={echarts}
            option={chartOption}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </CardBody>
    </Card>
  );
}