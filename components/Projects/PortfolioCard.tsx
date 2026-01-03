"use client";
import { ProjectWithUser } from "@/types/types";
import { FollowerPointerCard } from "../ui/following-pointer";
import { getNormalDate } from "@/lib/getNormalDate";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioCard({ project }: { project: ProjectWithUser }) {
  return (
    <div className="mx-auto w-80">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={project.user.name}
            avatar={project.user.image ?? "/placeholder.svg"}
          />
        }
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100">
            <Image
              src={project.thumbnail ?? "/placeholder.svg"}
              alt={project.name ?? ""}
              width={800}
              height={800}
              objectFit="cover"
              className="h-[250px] h-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
            />
          </div>
          <div className="p-4">
            <h2 className="my-4 text-lg font-bold text-zinc-700">{project.name}</h2>
            <h2 className="my-4 text-sm font-normal text-zinc-500">{project.description}</h2>
            <div className="mt-10 flex flex-row items-center justify-between">
              <span className="text-sm text-gray-500">{getNormalDate(project.startDate)}</span>
              <Link
                href={`/public/project/${project.slug}`}
                className="relative z-10 block cursor-none rounded-xl bg-black px-6 py-2 text-xs font-bold text-white hover:bg-black/80"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const TitleComponent = ({ title, avatar }: { title: string; avatar: string }) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);
