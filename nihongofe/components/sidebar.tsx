import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/0cecd302cf0bcd0f73d51768feff75fe.svg"
            alt="Logo"
            width={40}
            height={40}
          />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Nihongo
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-grow">
        <SidebarItem label="learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="character"
          href="/character"
          iconSrc="https://d35aaqx5ub95lt.cloudfront.net/vendor/80a60f598d6a6b0493aeb4d7b93fc0e3.svg"
        />
        <SidebarItem
          label="practice"
          href="/practice"
          iconSrc="/practice.svg"
        />
        <SidebarItem
          label="leaderboard"
          href="/leaderboard"
          iconSrc="https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg"
        />
        <SidebarItem
          label="quest"
          href="/quest"
          iconSrc="https://d35aaqx5ub95lt.cloudfront.net/vendor/7ef36bae3f9d68fc763d3451b5167836.svg"
        />
        <SidebarItem label="profile" href="/profile" iconSrc="/avatar.svg" />
      </div>

      <div className="mt-auto">
        <SidebarItem label="logout" href="/" iconSrc="/logout.svg" />
      </div>
    </div>
  );
};
