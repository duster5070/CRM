import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import Image from "next/image";
import { ProjectWithUser } from "@/types/types";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const Card = ({ img, name }: { img: string; name: string }) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <Image src={img} alt="" width={1080} height={1080} className="w-full" />
      <h2 className="mt-2 text-sm">{name}</h2>
    </Link>
  );
};

export function OtherPortfolioProjects({
  otherProjects,
}: {
  otherProjects: ProjectWithUser[];
}) {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          My other projects
        </h1>
        <p className="pb-4 leading-7 [&:not(:first-child)]:mt-6">
          These are some of my other projects
        </p>
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {otherProjects.map((project) => (
          <Card
            key={project.id}
            img={project.thumbnail ?? ""}
            name={project.name ?? ""}
          />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
