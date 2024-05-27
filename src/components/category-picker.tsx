import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Category } from "@prisma/client";

export function CategoryPicker({
  value,
  setValue,
  categories
}: {
  value: string;
  setValue: (value: string) => void;
  categories: Category[];
}) {
  return (
    <Select onValueChange={setValue} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map(category => (
            <SelectItem
              key={category.id}
              value={category.id}
              onSelect={() => {
                setValue(category.id);
              }}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
