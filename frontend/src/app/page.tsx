import { redirect } from "next/navigation";

export default function Page() {
  redirect("/login");

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
