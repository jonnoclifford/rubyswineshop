import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect to the Tina admin interface
  // This will be available at /admin/index.html after running tinacms dev
  redirect("/admin/index.html");
}
