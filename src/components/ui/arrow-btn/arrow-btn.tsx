import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { ComponentPropsWithoutRef, ReactNode, Ref, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GenericArrowProps {
  variant?: "bordered";
  color?: "default";
  size?: "sm" | "md" | "lg" | "xl";
  direction: "up" | "down" | "left" | "right";
}

type ArrowBtnProps = GenericArrowProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: never;
  };

type ArrowLinkProps = GenericArrowProps &
  ComponentPropsWithoutRef<"a"> & {
    href: string;
  };

function isLinkProps(
  props: ArrowBtnProps | ArrowLinkProps
): props is ArrowLinkProps {
  return "href" in props;
}

type Props = ArrowBtnProps | ArrowLinkProps;

const ArrowBtn = forwardRef(
  (props: Props, ref: Ref<HTMLButtonElement | HTMLAnchorElement>) => {
    const {
      variant,
      size = "md",
      direction,
      className,
    } = props;

    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-14 w-14",
    };

    const arrowBtnCss = cn(
      "inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50",
      sizeClasses[size],
      variant === "bordered"
        ? "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
        : "bg-white/90 backdrop-blur-md text-slate-800 shadow-md hover:bg-white hover:scale-105",
      className
    );

    let pointedIcon: ReactNode;
    switch (direction) {
      case "up":
        pointedIcon = <ChevronUp className="h-5 w-5" />;
        break;
      case "down":
        pointedIcon = <ChevronDown className="h-5 w-5" />;
        break;
      case "left":
        pointedIcon = <ChevronLeft className="h-5 w-5" />;
        break;
      case "right":
        pointedIcon = <ChevronRight className="h-5 w-5" />;
        break;
    }

    if (isLinkProps(props)) {
      const { href, ...rest } = props;
      return (
        <Link
          href={href}
          {...rest}
          className={arrowBtnCss}
          ref={ref as Ref<HTMLAnchorElement>}
        >
          {pointedIcon}
        </Link>
      );
    }

    const { ...rest } = props;
    return (
      <button
        {...rest}
        className={arrowBtnCss}
        ref={ref as Ref<HTMLButtonElement>}
      >
        {pointedIcon}
      </button>
    );
  }
);

ArrowBtn.displayName = "ArrowBtn";

export default ArrowBtn;
