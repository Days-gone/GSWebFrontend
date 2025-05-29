export interface GalleryItemData {
    uuid: string;
    url: string;
};

export interface SliceImgCardData {
    uuid: number;
    title: string;
    imgUrls: Array<string>;
};

export interface MetricData {
    name: string;
    values: number[];
};

export interface SliceCardData {
    title: string;
    description: string;
    metric1: MetricData;
    metric2: MetricData;
    categories: string[];
};