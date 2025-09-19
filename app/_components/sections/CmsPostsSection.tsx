import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/types/section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CmsPost } from "@/types/cms";
import { getFileUrl } from "@/lib/utils";
import { fetchCmsPosts, fetchMenuList } from "@/lib/fetchCms";
import cpData from "@/data/configs.json";
const CmsPostsSection = async ({ section }: { section: Section }) => {
  const posts = await fetchCmsPosts({
    perPage: 10,
    page: 1,
    categoryId: section.config.categoryId,
    clientPortalId: cpData.cpId,
  });

  console.log(posts, "menu in posts");
  console.log("aaaaa")
  return (
    <section className="py-16 bg-gray-100">
      aaa
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{section.config.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: CmsPost) => (
        <Card key={post._id}>
          <CardHeader>
            {post.thumbnail && <Image src={getFileUrl(post.thumbnail.url)} alt={post.title} width={300} height={300} className="rounded-t-lg" />}
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2">{post.title}</CardTitle>
            <CardDescription>
              <p dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Link href={`/blog/${post.slug}&postId=${post._id}&slug=${post.slug}`}>
              <Button>Read more</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
        </div>
        <div className=" text-center mt-6 ">
          <Link className="underline" href={"/blog"}>
            Show All blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CmsPostsSection;
