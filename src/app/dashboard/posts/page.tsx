import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "My Posts",
  robots: { index: false },
};

export default function MyPostsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Posts</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            No posts yet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Generate your first blog post from the{" "}
            <a href="/dashboard/new" className="underline underline-offset-2">
              New Post
            </a>{" "}
            page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
