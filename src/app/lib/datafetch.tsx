import axios from 'axios';
import { GalleryItemData } from "@/app/lib/types";

const serverUrl = "http://127.0.0.1:8000";


// Fetch data from the server
export function getImgUrl(uuid: string, type: string): string {
  const url = `${serverUrl}/images/${type}/${uuid}`;
  return url;
}

// ask the server for the number of images
export async function getSliceNumber(): Promise<number> {
  const num_url = `${serverUrl}/images/count`;
  try {
    const response = await axios.get(num_url);
    const number: number = response.data;
    return number;
  } catch (error) {
    console.error("Error fetching slice number:", error);
    return 0; // Return a default value in case of error
  }
}

export async function getSliceList(): Promise<GalleryItemData[]> {
  const url = `${serverUrl}/images/origin/list`;
  try {
    const response = await axios.get(url);
    // 后端返回的 data 是一个包含 'images' 数组的对象
    console.log("Response data:", response.data);
    const data = response.data as { images: GalleryItemData[] };
    for (let i = 0; i < data.images.length; i++) {
      const post = data.images[i].url;
      const final_url = `${serverUrl}${post}`;
      data.images[i].url = final_url;
    }
    return data.images || [];
  } catch (error) {
    console.error("Error fetching slice list:", error);
    return [];
  }
}

// Upload a slice file to the server
export async function uploadSliceFile(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${serverUrl}/images/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { message: response.data.message || 'Upload Success' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.detail || '上传失败'
      );
    }
    throw new Error('上传出现');
  }
}

// get a SliceImgCardData
export async function getSliceImgCardData(uuid: string): Promise<any> {
  const ori_url = getImgUrl(uuid, "ori");
  const mas_url = getImgUrl(uuid, "mas");
  const ove_url = getImgUrl(uuid, "ove");
  const tra_url = getImgUrl(uuid, "tra");
  const bou_url = getImgUrl(uuid, "bou");
  const ans_obj = {
    uuid: uuid,
    title: `Slice ${uuid.slice(-4)}`,
    imgUrls: [ori_url, mas_url, ove_url, tra_url, bou_url],
  }
  console.log(ans_obj);
  return ans_obj;
}
