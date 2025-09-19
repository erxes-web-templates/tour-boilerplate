import Link from "next/link";
import { Section } from "@/types/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CmsPost } from "@/types/cms";
import { fetchCmsPosts } from "@/lib/fetchCms";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import data from "@/data/configs.json";
import { getFileUrl, getThemeColors, addOpacity } from "@/lib/utils";
const colors = getThemeColors(data.appearance);

export default async function PostsSection({ section }: { section: Section }) {
  const posts = await fetchCmsPosts({
    perPage: section.config.perPage,
    page: 1,
    categoryId: section.config.categoryId,
    clientPortalId: data.cpId,
  });

  const truncateContent = (html: string, maxLength: number = 120) => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <section className="w-full py-16 md:py-20 lg:py-24  relative overflow-hidden" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 font-serif">
            <span
              style={{
                color: colors.text,
              }}
            >
              {section.config.title}
            </span>
          </h1>
          <div
            className="w-32 h-1.5 mx-auto rounded-full shadow-lg"
            style={{
              backgroundColor: colors.primary,
            }}
          ></div>
          <div
            className="w-16 h-0.5 mx-auto rounded-full mt-2 opacity-60"
            style={{
              backgroundColor: colors.primary,
            }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {posts.map((post: CmsPost, index: number) => (
            <Card
              key={post._id}
              className="group overflow-hidden border-none shadow-2xl hover:shadow-3xl transition-all duration-700 bg-slate-800/60 backdrop-blur-sm  border border-slate-700/50 hover:border-yellow-400/30 rounded-2xl"
            >
              <div className="relative">
                <div className="relative h-52 sm:h-60 md:h-64 lg:h-72 overflow-hidden rounded-t-2xl">
                  {post.thumbnail ? (
                    <Image
                      src={getFileUrl(post.thumbnail.url)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center">
                      <div className="text-slate-400 text-sm font-medium bg-slate-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                        No image available
                      </div>
                    </div>
                  )}

                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-slate-900/80 backdrop-blur-sm hover:bg-slate-900/90 shadow-lg font-medium border border-yellow-400/20 px-3 py-1"
                        style={{
                          color: colors.primary,
                        }}
                      >
                        {post.category}
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <Link
                      href={`blogs/${post._id}`}
                      className="inline-flex items-center  px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                      style={
                        {
                          color: colors.text,
                          backgroundColor: colors.primary,
                          "--hover-bg": colors.primaryHover,
                        } as React.CSSProperties & { "--hover-bg": string }
                      }
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>

                <CardContent className="p-6 md:p-8 space-y-5  backdrop-blur-sm" style={{ backgroundColor: colors.primaryLight }}>
                  {post.createdAt && (
                    <div
                      className="flex items-center text-sm"
                      style={{
                        color: colors.text,
                      }}
                    >
                      <div className="flex items-center px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.primaryLight }}>
                        <Calendar
                          className="w-4 h-4 mr-2"
                          style={{
                            color: colors.text,
                          }}
                        />
                        <span
                          className="font-medium"
                          style={{
                            color: colors.textLight,
                          }}
                        >
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  <h3
                    className="text-xl sm:text-2xl md:text-2xl font-bold leading-tight transition-colors duration-300 line-clamp-2 font-serif"
                    style={{
                      color: colors.text,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm md:text-base leading-relaxed line-clamp-3"
                    style={{
                      color: colors.textLight,
                    }}
                  >
                    {truncateContent(post.content)}
                  </p>

                  <Link href={`blogs/${post._id}`} className="inline-block pt-2">
                    <Button
                      variant="ghost"
                      className="group/btn p-0 h-auto font-semibold  transition-all duration-300 hover:bg-transparent"
                      style={{
                        color: colors.primary,
                        backgroundColor: colors.background,
                      }}
                    >
                      Цааш унших
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="text-center mt-16 md:mt-20 lg:mt-24">
            <Link href={`blogs`}>
              <Button
                size="lg"
                className="relative px-10 py-5 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 "
                style={
                  {
                    color: colors.text,
                    backgroundColor: "#660032",
                    "--hover-bg": colors.primaryHover,
                  } as React.CSSProperties & { "--hover-bg": string }
                }
              >
                <span className="relative z-10 flex items-center">
                  Explore All Articles
                  <ArrowRight className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        )}

        {posts.length === 0 && (
          <div className="relative items-center justify-center text-center bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-10 lg:p-16 max-w-lg mx-auto border border-slate-700/50">
            <div className="text-6xl mb-6 opacity-60">📝</div>
            <h3 className="text-2xl font-bold text-slate-100 mb-4 font-serif">No Posts Yet</h3>
            <p className="text-slate-300 leading-relaxed">No blog posts available at the moment. Check back soon for fresh content and insights!</p>
          </div>
        )}
      </div>
    </section>
  );
}
