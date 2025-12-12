import { UserRole } from "@prisma/client";

export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
};
export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
  role?: UserRole
  country?: string
  location?:string
};
export type LoginProps = {
  email: string;
  password: string;
};
