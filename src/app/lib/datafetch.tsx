import axios from 'axios';
import { GalleryItemData } from "@/app/lib/types";
import { List } from 'echarts';

const serverUrl = "http://127.0.0.1:8000/api";


// Fetch data from the server
export function getImgUrl(id: number, type: string): string {
    const url = `${serverUrl}/img/${id}?tab=${type}`;
    return url;
  }

// ask the server for the number of images
export async function getSliceNumber() {
    const num_url = `${serverUrl}/img_total`;
    try {
        const response = await axios.get(num_url);
        const data = response.data;
        return data.total;
    } catch (error) {
        console.error("Error fetching slice number:", error);
        return 0; // Return a default value in case of error
    }
}

export async function getSliceList() : Promise<GalleryItemData[]> {
    const slice_num = await getSliceNumber();
    let sliceList = [];
    for (let i = 1; i <= slice_num; i++) {
        const urlres = getImgUrl(i, "ori");
        sliceList.push(
            {
                id: i,
                title: `Slice ${i}`,
                imgUrl: urlres,
            } as unknown as GalleryItemData
        );
    }

    return sliceList;
}