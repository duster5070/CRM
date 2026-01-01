import {
  Project,
  UserRole,
  ProjectStatus,
  TaskStatus,
  Payment as IPayment,
  User,
  File
} from "@prisma/client";

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
  userLogo?: string;
  role?: UserRole;
  userId?: string;
  country?: string;
  location?: string;
  companyName?: string;
  companyDescription?: string;
};
export type PaymentProps = {
  amount: number;
  title: string;
  tax: number;
  date: string;
  invoiceNumber: string;
  method: string;
  projectId: string;
  userId: string;
  clientId: string;
};
export type CommentProps = {
  content: string;
  projectId: string;
  userName: string;
  userRole: UserRole;
  userId: string;
};
export type CreatePaymentInput = {
  amount: number;
  tax: number;
  method: string;
  date?: Date;
  projectId: string;
  userId: string;
  clientId: string;
};

export type ProjectProps = {
  name: string;
  slug: string;
  notes: string;
  description: string;
  bannerImage: string;
  gradient: string;
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
  gradient: string;
  thumbnail: string | null;
  budget: number | null;
  deadline: number | null;
  startDate: Date;
  freeDomain:string|null;
  customDomain:string|null;
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
  user: User;
};

export type ProjectWithUser = {
  id: string;
  name: string | null;
  slug: string;
  notes: string | null;
  description: string | null;
  bannerImage: string | null;
  gradient: string | null;
  thumbnail: string | null;
  budget: number | null;
  deadline: number | null;
  startDate: Date;
  endDate: Date | null;
  status: ProjectStatus;
  clientId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
export type ProjectWithPayments = {
  id: string;
  name: string | null;
  slug: string;

  thumbnail: string | null;

  status: ProjectStatus;

  payments: Payment[];
};
export type ProjectWithPaymentsArray = ProjectWithPayments[];

export type moduleData = {
  id: string;
  name: string | null;
  userName: string;
  projectId: string;
  userId: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
};

export type Module = {
  id: string;
  name: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectComment = {
  id: string;
  content: string;
  projectId: string;
  userName: string;
  userRole: UserRole;
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
export type InvoiceDetails = {
  invoice: IPayment;
  user: IUser | null;
  client: IClient | null;
};

interface IUser {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  companyDescription: string;
  userLogo: any;
}
interface IClient {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  companyDescription: string;
}

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
  title: string;
  date: Date;
  method: string;
  projectId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  invoiceNumber: string;
};

export type analyticsProps = {
  title: string;
  total: string;
  href: string;

  icon: any;
  isCurrency?: boolean;
};

export type ModuleProps = {
  name: string;
  userName: string;
  projectId: string;
  userId: string;
};

export type TaskProps = {
  title: string;
  status: TaskStatus;
  moduleId: string;
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
  plain: string | null;
  companyName: string | null;
  companyDescription: string | null;
};

export interface FolderProps{

  name: string;
 
  userId: string;
  

}
export interface FileProps{
  name: string;
 type: string;
 size: number;
 folderId: string;
  userId: string;

}
export interface UserFolder {
  id: string;
  name: string;
  userId: string;
  files: File[];
  createdAt: Date;

}
export type UserFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
};
export type PortfolioProps = {
  userId: string;
  name: string;
  profileImage: string;
  location: string;
  projectCount: number;
  email: string;
  bookingLink: string;
  description: string;
  twitterUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  githubUrl: string;
};
