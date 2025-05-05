
import { detailData } from "@/app/lib/dataexample";
import SliceImgCard from "@/app/ui/SliceImgCard";
import { SliceImgCardData } from "@/app/lib/types";
import { MetricData, SliceCardData } from "@/app/lib/types";
import { metricdata } from "@/app/lib/dataexample";
import SliceInfoCard from "@/app/ui/SliceInfoCard";
import { useParams } from "next/navigation";
import { getSliceImgCardData } from "@/app/lib/datafetch";

const example: SliceImgCardData = detailData;
const example2: SliceCardData = metricdata;

export default async function SlicePage() {
  // get the slice id from the url
  const { slice_id_para } = useParams();
  const slice_id = parseInt(slice_id_para as string);

  const imgcard_data: SliceImgCardData = await getSliceImgCardData(slice_id);

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
  )
};