import React from "react"
import Image from "next/image"
import { Calendar, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { CmsPost } from "../../../types/cms"
import { fetchCmsPost } from "@/lib/fetchCms"
import { Section } from "@/types/section";
import data from "@/data/configs.json";
import { getFileUrl, getThemeColors, addOpacity } from "@/lib/utils";

const colors = getThemeColors(data.appearance);


const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

type Params = Promise<{ id: string }>

type Props = {
  params: Params
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BlogPost({ params }: { params: Params }) {

  const { id } = await params
  const post = await fetchCmsPost({
    id,
  })

  const calculateReadTime = (content: string) => {
    if (!content) return "1 min read"
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const readTime = Math.ceil(words / wordsPerMinute)
    return `${readTime} min read`
  }




  return (
    <div className='min-h-screen' style={{
      backgroundColor: colors.background
    }}>

      <article className='relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16'>
        <div className='max-w-5xl mx-auto'>
          <Link
            href='/blogs'
            className='inline-flex items-center transition-all duration-300 mb-12 lg:mb-16 group backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl '
            style={{
              color: colors.text,
              backgroundColor: colors.background,
              '--hover-bg': colors.primaryHover
            } as React.CSSProperties & { '--hover-bg': string }}
          >
            <ArrowLeft className='w-5 h-5 mr-3 transition-transform duration-300 group-hover:-translate-x-1' />
            <span className='font-medium text-sm'>Back to Blog</span>
          </Link>

          <main className='space-y-8 lg:space-y-12'>
            <header className='text-center space-y-6 lg:space-y-8'>
              {post.category && (
                <div className='flex justify-center mb-4'>
                  <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-medium '
                    style={{
                      backgroundColor: colors.background, color: colors.primary
                    }}>
                    {post.category}
                  </span>
                </div>
              )}

              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight font-serif tracking-tight'>
                <span style={{
                  color: colors.text
                }}>
                  {post.title}
                </span>
              </h1>

              <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm'>
                <span className='flex items-center backdrop-blur-sm px-5 py-3 rounded-full shadow-lg transition-all duration-300' style={{
                  backgroundColor: colors.background,
                }}>
                  <Calendar className='w-4 h-4 mr-3 ' style={{
                    color: colors.primary
                  }} />
                  <span className='font-medium' style={{
                    color: colors.text
                  }}>{formatDate(post?.createdAt)}</span>
                </span>
                <span className='flex items-center backdrop-blur-sm px-5 py-3 rounded-full shadow-lg transition-all duration-300' style={{
                  backgroundColor: colors.background,
                }}>
                  <Clock className='w-4 h-4 mr-3' style={{
                    color: colors.primary
                  }} />
                  <span className='font-medium' style={{
                    color: colors.text
                  }}>{calculateReadTime(post.content || "")}</span>
                </span>
              </div>

              {post.excerpt && (
                <div className='max-w-4xl mx-auto'>
                  <p className='text-lg sm:text-xl lg:text-2xl  leading-relaxed font-light' style={{
                    color: colors.textLight
                  }}>
                    {post.excerpt}
                  </p>
                </div>
              )}
            </header>

            {post.thumbnail && (
              <div className='relative group'>
                <div className='absolute -inset-1 rounded-3xl'></div>
                <div className='relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl'>
                  <Image
                    src={getFileUrl(post.thumbnail.url)}
                    alt={post.title}
                    fill
                    className='object-cover'
                    unoptimized
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                </div>
              </div>
            )}

            <div className='relative group'>
              <div className='absolute -inset-1 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000'></div>
              <div className='relative bg-gray-700 text-gray-300 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-16 border border-slate-200/20'>
                <article className='prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none 
                  prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-8
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mb-6
                  prose-h1:text-3xl sm:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h1:leading-tight
                  prose-h2:text-2xl sm:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:leading-tight
                  prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:leading-tight
                  prose-a:text-yellow-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-yellow-700 hover:prose-a:underline prose-a:transition-all
                  prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-10
                  prose-strong:text-slate-900 prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-yellow-400 prose-blockquote:bg-yellow-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8
                  prose-code:bg-slate-100 prose-code:px-3 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono
                  prose-pre:hidden
                  prose-ul:space-y-3 prose-ol:space-y-3
                  prose-li:text-slate-700 prose-li:leading-relaxed'>
                  <div
                    className='w-full'
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>
              </div>
            </div>

            {post.length > 0 && (
              <section className='relative'>
                <div className='absolute -inset-1 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 rounded-3xl blur opacity-10'></div>
                <div className='relative bg-slate-800/50 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-slate-700/50'>
                  <div className='text-center mb-10'>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 font-serif'>
                      Related Articles
                    </h2>
                    <div className='w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full'></div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {post.slice(0, 3).map((relatedPost: CmsPost) => (
                      <Link
                        key={relatedPost._id}
                        href={`blogs/${post._id}`}
                        className='group block bg-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:bg-slate-700/70 border border-slate-600/50 hover:border-yellow-400/30 hover:-translate-y-2'
                      >
                        {relatedPost.thumbnail && (
                          <div className='relative h-40 sm:h-48 overflow-hidden'>
                            <Image
                              src={getFileUrl(relatedPost.thumbnail.url)}
                              alt={relatedPost.title}
                              fill
                              className='object-cover transition-transform duration-500 group-hover:scale-110'
                              unoptimized
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                          </div>
                        )}
                        <div className='p-6'>
                          <h3 className='font-semibold text-slate-200 group-hover:text-yellow-400 transition-colors line-clamp-2 mb-3 text-lg leading-tight'>
                            {relatedPost.title}
                          </h3>
                          <p className='text-sm text-slate-400 line-clamp-2 leading-relaxed'>
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </article>
    </div>
  )
}
