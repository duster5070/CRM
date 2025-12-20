import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit, Link, Pen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectProps } from "@/types/types";
import { updateProjectById } from "@/actions/projects";
import ImageInput from "../FormInputs/ImageInput";
import toast from "react-hot-toast";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useForm } from "react-hook-form";

export default function ProjectBanner({
  bannerImage,
  name,
  editingId,
  bg,
}: {
  bannerImage: string | null;
  name: string | null;
  editingId?: string | undefined;
  bg: string | null;
}) {
  const gradients = [
    "bg-gradient-to-r from-blue-500 to-purple-600",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    "bg-gradient-to-r from-[#62cff4] to-[#2c67f2]",
    "bg-gradient-to-r from-[#004ff9] to-[#000000]",
    "bg-gradient-to-r from-[#fec163] to-[#de4313]",
    "bg-gradient-to-r from-[#fab2ff] to-[#1904e5]",
    "bg-gradient-to-r from-[#662d8c] to-[#ed1e79]",
    "bg-gradient-to-r from-[#c5f9d7] via-[#f7d486] to-[#f27a7d]",
    "bg-gradient-to-r from-[#ffffff] to-[#d4dfed]",
    "bg-gradient-to-r from-[#262935] to-[#b30938]",
    "bg-gradient-to-r from-[#c60721] to-[#000000]",
  ];
  const [gradient, setGradient] = useState(bg || gradients[11]);
  const [imageUrl, setImageUrl] = useState(
    bannerImage || "/bg4.jpg?height=256&width=1024"
  );
  const [loading, setLoading] = useState(false);

  const handleGradientChange = async (gradient: string) => {
    setGradient(gradient);
    const data: any = {
      gradient,
    };
    try {
      if (editingId) {
        await updateProjectById(editingId, data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBannerUpdate = async () => {
    const data: any = {
      bannerImage: imageUrl,
    };
    try {
      setLoading(true);
      if (editingId) {
        await updateProjectById(editingId, data);
        setLoading(false);
        toast.success("Banner Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to Update Banner");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectProps>({
    defaultValues: {
      bannerImage: "",
      name: name || "",
    },
  });
  async function updateBannerByURL(data: ProjectProps) {
    try {
      setImageUrl(data.bannerImage);
      setLoading(true);
      if (editingId) {
        await updateProjectById(editingId, data);
        setLoading(false);
        toast.success("Banner Updated Successfully!");
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const [editing, setEditing] = useState(false);
  async function updateProjectTitle(data: ProjectProps) {
    try {
      setLoading(true);
      if (editingId) {
        await updateProjectById(editingId, data);
        setLoading(false);
        toast.success("Title Updated Successfully!");
        reset();
        setEditing(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <div
      className={`relative h-64 rounded-xl ${gradient} mb-8 overflow-hidden group`}
    >
      <img
        src={imageUrl}
        alt="Project Banner"
        className="w-full h-full object-cover mix-blend-overlay"
      />

      <div className="absolute inset-0 flex justify-center items-center">
        {editing ?         
        <form className="max-w-[600px]" onSubmit={handleSubmit(updateProjectTitle)}>
          <div className="flex w-full items-center gap-3">
            <TextInput
              register={register}
              errors={errors}
              label=""
              name="name"
              placeholder="Enter project title"
            />
            <SubmitButton
              size={"sm"}
              title="Update"
              loading={loading}
            />
          </div>
        </form> 
        :
        <h1 className="text-4xl font-bold text-white">{name}</h1>
        }
        {!editing &&  
          <Button
            onClick={() => setEditing(true)}
            variant="link"
            size="icon"
            className="group-hover:opacity-100 opacity-0 ml-4 transition-opacity"
          >
          <Pen className="h-4 w-4 text-white" />
          </Button>
        }

      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Tabs defaultValue="gradient" className="w-full">
            <TabsList>
              <TabsTrigger value="gradient">Gradients</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="link">Link</TabsTrigger>
              {/* <TabsTrigger value="unsplash">Unsplash</TabsTrigger> */}
            </TabsList>
            <TabsContent value="gradient">
              <div className="grid grid-cols-3 gap-4 py-3">
                {gradients.map((gradient, index) => (
                  <Button
                    onClick={() => {
                      handleGradientChange(gradient);
                    }}
                    key={index}
                    className={`w-20 h-16 rounded-2xl shadow-lg ${gradient}`}
                  ></Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="upload">
              <div className="grid auto-rows-max items-start gap-4 ">
                <ImageInput
                  title="Banner Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="bannerImage"
                />
                <Button disabled={loading} onClick={handleBannerUpdate}>
                  {loading ? "Updating..." : "Update Banner Image"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="link">
              <form className="" onSubmit={handleSubmit(updateBannerByURL)}>
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label=""
                    name="bannerImage"
                    icon={Link}
                    placeholder="Enter your image link"
                  />
                  <SubmitButton
                    size={"sm"}
                    title="Update Banner Image"
                    loading={loading}
                  />
                </div>
              </form>
            </TabsContent>
            {/* <TabsContent value="unsplash">
              <div className="grid grid-cols-2 gap-4 px-4 py-3">
                {gradients.map((gradient, index) => (
                  <Button
                    onClick={() => {
                      handleGradientChange(gradient);
                    }}
                    key={index}
                    className={`w-32 h-20 rounded-2xl shadow-lg ${gradient}`}
                  ></Button>
                ))}
              </div>
            </TabsContent> */}
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
}
