'use client'

import { SliceImgCardData } from "@/app/lib/types";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Tabs, Tab } from "@heroui/react";
import { Image } from "@heroui/image";
import { useState } from "react";


function getImgUrl(img_card_data: SliceImgCardData, selected: string) {
    switch (selected) {
        case "ori":
            return img_card_data.imgUrls[0];
        case "mas":
            return img_card_data.imgUrls[1];
        case "ove":
            return img_card_data.imgUrls[2];
        case "tra":
            return img_card_data.imgUrls[3];
        case "bou":
            return img_card_data.imgUrls[4];
        default:
            return img_card_data.imgUrls[0];
    }
}


export default function SliceImgCard(
    { img_card_data }: { img_card_data: SliceImgCardData },
) {
    let [selected, setSelect] = useState("ori");
    let choices = [
        { key: "ori", title: "ORI" },
        { key: "mas", title: "MAS" },
        { key: "ove", title: "OVE" },
        { key: "tra", title: "TRA" },
        { key: "bou", title: "BOU" },
    ];

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold">{img_card_data.title}</h2>
                <Tabs selectedKey={selected} items={choices} onSelectionChange={(key) => setSelect(key as string)}>
                    {(item) => (
                        <Tab key={item.key} title={item.title}>
                        </Tab>
                    )}
                </Tabs>
            </CardHeader>
            <CardBody>
                <Image src={getImgUrl(img_card_data, selected)} alt={img_card_data.title} className="w-full h-full object-cover">
                </Image>
            </CardBody>
        </Card>

    );
}