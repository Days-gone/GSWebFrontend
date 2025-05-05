import axios from 'axios';
import { GalleryItemData } from "@/app/lib/types";

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

export async function getSliceList(): Promise<GalleryItemData[]> {
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

// Upload a slice file to the server
export async function uploadSliceFile(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${serverUrl}/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { message: response.data.message || '文件上传成功！' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.detail || '上传失败，请稍后重试。'
      );
    }
    throw new Error('上传出错，请检查网络或服务器。');
  }
}

// get a SliceImgCardData
export async function getSliceImgCardData(id: number): Promise<any> {
  const ori_url = getImgUrl(id, "ori");
  const cam_url = getImgUrl(id, "cam");
  const glcm_url = getImgUrl(id, "glcm");
  const ans_obj = {
    id: id,
    title: `Slice ${id}`,
    imgUrls: [ori_url, cam_url, glcm_url],
  }
}
