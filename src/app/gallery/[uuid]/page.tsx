"use client"
import { detailData } from "@/app/lib/dataexample";
import SliceImgCard from "@/app/ui/SliceImgCard";
import { SliceImgCardData } from "@/app/lib/types";
import { MetricData, SliceCardData } from "@/app/lib/types";
import { metricdata } from "@/app/lib/dataexample";
import SliceInfoCard from "@/app/ui/SliceInfoCard";
import { useParams } from "next/navigation";
import { getSliceImgCardData } from "@/app/lib/datafetch";
import { useEffect, useState } from "react";

const example: SliceImgCardData = detailData;
const example2: SliceCardData = metricdata;

export default function SlicePage() {
  const params = useParams();
  const uuid_from_params = params.uuid;
  const [imgcard_data, setImgcard_data] = useState<SliceImgCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (uuid_from_params) {
       const uuid_str = uuid_from_params as string;

      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getSliceImgCardData(uuid_str);
          console.log("获取的切片图像卡数据:", data);
          if (data) {
            setImgcard_data(data);
          } else {
            setError("加载数据失败或未找到数据。");
          }
        } catch (e) {
          console.error("获取切片图像卡数据时出错:", e);
          setError("获取数据时发生错误。");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
    }
  }, [uuid_from_params]);

  if (isLoading) {
    return <div>正在加载图像数据...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  if (!imgcard_data) {
    return <div>没有可用的图像数据。</div>;
  }

  return (
    <div className="w-full flex">
      <div className="w-3/5">
        <SliceImgCard
          img_card_data={imgcard_data}
        />
      </div>
      <div className="w-2/5">
        <SliceInfoCard data={example2} />
      </div>
    </div>
  );
}