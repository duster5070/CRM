import { Project, UserRole, ProjectStatus } from "@prisma/client";

// export type ProjectStatus = "ONGOING" | "COMPLETE";

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
  role?: UserRole;
  userId?: string;
  country?: string;
  location?: string;
  companyName?: string;
  companyDescription?: string;
};

export type ProjectProps = {
  name: string;
  slug: string;
  notes: string;
  description: string;
  bannerImage: string;
  thumbnail: string;
  startDate: any;
  endDate: any;
  status: ProjectStatus;
  clientId: string;
  userId: string;
  budget: number;
  deadline: number;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type ProjectData = {
  id: string;
  name: string | null;
  slug: string;
  notes: string;
  description: string | null;
  bannerImage: string | null;
  thumbnail: string | null;
  budget: number | null;
  deadline: number | null;
  startDate: Date;
  endDate: Date | null;
  status: ProjectStatus;
  clientId: string;
  userId: string;
  modules: Module[];
  comments: ProjectComment[];
  members: Member[];
  invoices: Invoice[];
  payments: Payment[];
  createdAt: Date;
  updatedAt: Date;
  client: ClientData;
};

export type Module = {
  id: string;
  name: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectComment = {
  id: string;
  content: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  dueDate: Date;
  projectId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  amount: number;
  date: Date;
  method: string;
  projectId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientData = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string | null;
  country: string | null;
  location: string | null;
  role: UserRole;
  companyName: string | null;
  companyDescription: string | null;
};
