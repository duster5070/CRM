import { Project } from "@prisma/client";
import { GithubIcon, Linkedin, MapPin, Monitor, TwitterIcon } from "lucide-react";
import Image from "next/image";
import PortfolioCard from "./Projects/PortfolioCard";
import { ProjectWithUser } from "@/types/types";

type ProjectCardProps = {
    title:string;
    description:string;
    revenue:string;
    data:string;
}

const ProjectCard = ({project}:{project:Project})=>(
    <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
                <h3 className="text-lg font-semibold ml-2">{project.name}</h3>
            </div>
            <span className="text-indigo-600 font-semibold">${project.budget}/mo</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
        <div className="h-24">
        <Image src={project.thumbnail??"/placeholder.ssvg"} alt="This is an image" width={800} height={800} />
        </div>
    </div>
);

export default function Portfolio({projects}:{projects:ProjectWithUser[]}){
    return(
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
               <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">

                <div className="bg-yellow-300 rounded-full w-48 h-48 mx-auto mb-6 overflow-hidden">
                    <img src={projects[0].user.image??"/placeholder.ssvg"} alt="" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-4xl font-bold text-center mb-2">Ahmed</h1>
                <div className="flex items-center justify-center mb-4">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2"/>
                    <span className="text-gray-600">Cairo</span>
                    <Monitor className="w-4 h-4 ml-2 text-gray-500 mr-2"/>
                    <span className="text-gray-600">$64.8k/month</span>
                </div>
                <p className="text-center mb-4">
                    <span className="font-semibold">28,855</span>
                    enterpnures read {" "}
                    <span className="text-yellow-500 text-semibold">just ship it</span>
                </p>
                <p className="text-center mb-6">
                    I share how i find startup ideas and build them into successful products
                </p>
                <div className="flex mb-6">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-grow rounded-l-lg border-t border-b border-l border-gray-300 px-4 py-2"
                    />
                    <button className="rounded-r-lg bg-yellow-500 text-white px-6 py-2 font-semibold">
                        Subscribe
                    </button>
                </div>

                <div className="flex justify-center space-x-4">
                    <Linkedin className="w-6 h-6 text-gray-500"/>
                    <TwitterIcon className="w-6 h-6 text-gray-500"/>
                    <GithubIcon className="w-6 h-6 text-gray-500"/>
                </div>

                </div>
                <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.slice(0,4).map((project,index)=>(
                        // <ProjectCard
                        //     key={index}
                        //     project={project}
                        // />
                        <PortfolioCard key={index} project={project}/>
                    ))}
                </div>
               </div>
            </div>
        </div>
    );
}