import React from "react";
import { Checkbox, cn, User } from "@nextui-org/react";

interface props {
  user: string;
}

export const CustomCheckbox = ({ user }: props) => {
  return (
    <Checkbox
      aria-label={user}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
    >
      <div className="w-full flex justify-between gap-2">
        <User name={user} />
      </div>
    </Checkbox>
  );
};
