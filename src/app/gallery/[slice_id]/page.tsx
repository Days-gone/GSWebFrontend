
import { detailData } from "@/app/lib/dataexample";
import SliceImgCard from "@/app/ui/SliceImgCard";
import {SliceImgCardData} from "@/app/lib/types";
import { MetricData, SliceCardData } from "@/app/lib/types";
import { metricdata } from "@/app/lib/dataexample";
import SliceInfoCard from "@/app/ui/SliceInfoCard";

const example: SliceImgCardData = detailData;
const example2: SliceCardData = metricdata;

export default function SlicePage() {
  return (
    <div className="w-full flex">
      <div className="w-3/5">
        <SliceImgCard
          img_card_data={example}
        />
      </div>
      <div className="w-2/5">
      <SliceInfoCard data={example2} />
      </div>
    </div>
  )
};