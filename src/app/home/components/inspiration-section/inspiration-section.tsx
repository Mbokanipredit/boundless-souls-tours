"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CardBlog from "@/components/card-blog/card-blog";
import { blogData } from "@/data/blog-data";

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
  hidden: { opacity: 0, y: 30 },
};

function InspirationSection() {
  return (
    <section id="inspiration" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Get Inspiration For Your Next Trip
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            Explore articles, destination guides, and travel tips from expert explorers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, i) => (
            <motion.div
              key={blog.blogId}
              variants={variants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href="#">
                <CardBlog
                  date={blog.createdAt}
                  imgLink={blog.image}
                  title={blog.title}
                  size="md"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InspirationSection;
