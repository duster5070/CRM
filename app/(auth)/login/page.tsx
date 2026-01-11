import LoginForm from "@/components/Forms/LoginForm";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page(props: { searchParams?: Promise<{ callbackUrl?: string }> }) {
  const session = await getServerSession(authOptions);

  const searchParams = await props.searchParams;
  const rawCallbackUrl = searchParams?.callbackUrl;

  const callbackUrl =
    rawCallbackUrl && !rawCallbackUrl.includes("/login") ? rawCallbackUrl : "/dashboard";

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <section>
      <LoginForm />
    </section>
  );
}
