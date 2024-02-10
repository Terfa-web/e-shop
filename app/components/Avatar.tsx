import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  if (src)
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full w-30 h-30"
        width={20}
        height={20}
      />
    );

  return <FaUserCircle size={24} />;
};

export default Avatar;
