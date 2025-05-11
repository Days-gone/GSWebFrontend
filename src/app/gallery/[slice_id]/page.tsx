"use client"
import { detailData } from "@/app/lib/dataexample";
import SliceImgCard from "@/app/ui/SliceImgCard";
import { SliceImgCardData } from "@/app/lib/types";
import { MetricData, SliceCardData } from "@/app/lib/types";
import { metricdata } from "@/app/lib/dataexample";
import SliceInfoCard from "@/app/ui/SliceInfoCard";
import { useParams } from "next/navigation";
import { getSliceImgCardData } from "@/app/lib/datafetch";
import { useEffect, useState } from "react"; // 导入 useEffect 和 useState

const example: SliceImgCardData = detailData;
const example2: SliceCardData = metricdata;

export default function SlicePage() { // 移除 async
  const params = useParams();
  const slice_id_from_params = params.slice_id; // 使用正确的参数名 slice_id
  const [imgcard_data, setImgcard_data] = useState<SliceImgCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slice_id_from_params) {
       const slice_id_str = Array.isArray(slice_id_from_params) ? slice_id_from_params[0] : slice_id_from_params;
      const slice_id = parseInt(slice_id_str as string);
      if (isNaN(slice_id)) {
        setError("无效的切片 ID。");
        setIsLoading(false);
        return;
      }

      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getSliceImgCardData(slice_id);
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
  }, [slice_id_from_params]); // 依赖数组：如果 slice_id_para 更改，则重新运行 effect

  if (isLoading) {
    return <div>正在加载图像数据...</div>; // 显示加载指示器
  }

  if (error) {
    return <div>错误: {error}</div>; // 显示错误消息
  }

  if (!imgcard_data) {
    // 此情况理想情况下应由错误或加载状态覆盖，
    // 但作为加载后数据为 null 且未设置错误字符串时的后备方案。
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