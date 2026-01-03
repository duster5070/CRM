import { PortfolioProfile, Project } from "@prisma/client";
import {
  Calendar,
  GithubIcon,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Monitor,
  TwitterIcon,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import PortfolioCard from "./Projects/PortfolioCard";
import { ProjectWithUser } from "@/types/types";
import { Button } from "./ui/button";
import Link from "next/link";
import SubscribeForm from "./Forms/SubscribeForm";
import { OtherPortfolioProjects } from "./OtherPortfolioProjects";

type ProjectCardProps = {
  title: string;
  description: string;
  revenue: string;
  data: string;
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="rounded-lg bg-white p-4 shadow-md">
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center">
        <h3 className="ml-2 text-lg font-semibold">{project.name}</h3>
      </div>
      <span className="font-semibold text-indigo-600">${project.budget}/mo</span>
    </div>
    <p className="mb-4 text-sm text-gray-600">{project.description}</p>
    <div className="h-24">
      <Image
        src={project.thumbnail ?? "/placeholder.ssvg"}
        alt="This is an image"
        width={800}
        height={800}
      />
    </div>
  </div>
);

export default function Portfolio({
  projects,
  profile,
  otherProjects,
}: {
  projects: ProjectWithUser[];
  profile: PortfolioProfile;
  otherProjects: ProjectWithUser[];
}) {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/3">
            <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full bg-yellow-300">
              <Image
                src={profile.profileImage ?? "/placeholder.svg"}
                alt={profile.name}
                className="h-full w-full object-cover"
                width={640}
                height={512}
              />
            </div>
            <h1 className="mb-2 text-center text-4xl font-bold">{profile.name}</h1>
            <div className="mb-4 flex items-center justify-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{profile.location}</span>
              <Monitor className="ml-2 mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{profile.projectCount} Projects</span>
            </div>
            <div className="flex items-center gap-3 pl-16">
              <Button asChild>
                <Link href="">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Link>
              </Button>
              <Button asChild variant={"outline"}>
                <Link
                  href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${profile.email}&su=Your+Subject+Here&body=Your+Body+Text+Here"`}
                >
                  <Mail className="h4 mr-2 w-4" />
                  Mail me
                </Link>
              </Button>
            </div>
            <p className="py-3 text-center">{profile.description}</p>
            {/* subscribe */}
            {/* <div className="flex mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-l-lg border-t border-b border-l border-gray-300 px-4 py-2"
              />
              <button className="rounded-r-lg bg-yellow-500 text-white px-6 py-2 font-semibold">
                Subscribe
              </button>
            </div> */}
            <SubscribeForm userId={profile.userId} />
            <div className="flex justify-center space-x-4">
              <Link href={profile.linkedinUrl ?? ""}>
                <Linkedin className="h-6 w-6 text-gray-500" />
              </Link>
              <Link href={profile.twitterUrl ?? ""}>
                <TwitterIcon className="h-6 w-6 text-gray-500" />
              </Link>
              <Link href={profile.githubUrl ?? ""}>
                <GithubIcon className="h-6 w-6 text-gray-500" />
              </Link>
              <Link href={profile.instagramUrl ?? ""}>
                <Instagram className="h-6 w-6 text-gray-500" />
              </Link>
              <Link href={profile.youtubeUrl ?? ""}>
                <Youtube className="h-6 w-6 text-gray-500" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:w-2/3 md:grid-cols-2">
            {projects.map((project, index) => (
              // <ProjectCard
              //     key={index}
              //     project={project}
              // />
              <PortfolioCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
      <div className="py-16">
        <OtherPortfolioProjects otherProjects={otherProjects} />
      </div>
    </div>
  );
}
