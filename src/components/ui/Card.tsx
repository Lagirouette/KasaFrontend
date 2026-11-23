import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  as?: "div" | "section" | "article" | "aside";
};

export default function Card({ as: Tag = "div", className = "", ...props }: Props) {
  return <Tag className={`bg-surface rounded-[10px] p-5 sm:p-6 ${className}`} {...props} />;
}
