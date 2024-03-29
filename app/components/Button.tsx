"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Buttton = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    border-size-700
    flex
    items-center
    justify-center
    gap-2
    disabled:opacity-70
    ${outline ? "bg-white" : "bg-slate-700"}
    ${outline ? "text-slate-700" : "text-white"}
    ${small ? "text-xs font-light" : "text-md font-smbold"}
    ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
    ${custom ? custom : " "}`}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Buttton;
