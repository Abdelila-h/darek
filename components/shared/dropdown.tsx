"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICategory } from "@/lib/database/models/category.model";
import { getEnabledCategories } from "trace_events";

type DropDownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const DropDown = ({ onChangeHandler, value }: DropDownProps) => {
  const categories = [
    { _id: "65840b5b26f5b7b3d8d29103", name: "Studio" },
    { _id: "65840b5b26f5b7b3d8d29104", name: "Appartement" },
    { _id: "65840b5b26f5b7b3d8d29105", name: "Dar" },
    { _id: "65840b5b26f5b7b3d8d29106", name: "Villa" },
  ] as ICategory[];

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full bg-grey-50 h-[54px] placeholder:text-grey-500 rounded-full p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent focus:ring-transparent !important">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category._id}
            value={category._id}
            className="py-3 cursor-pointer p-regular-14 focus:bg-primary-50"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDown;
