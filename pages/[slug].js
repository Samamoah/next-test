import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../layouts/Navbar";

export default function Post() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  function fetchData() {
    setLoading(true);
    fetch(`https://mfidie.com/wp-json/wp/v2/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Head>
        <title>Mfidie - Post</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div class="max-w-screen-xl mx-auto">
        {loading ? (
          <div className="w-2/3 my-10 mx-auto">loading...</div>
        ) : (
          Object.keys(post).length !== 0 && (
            <main class="my-10">
              <div
                class="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
                style={{ height: "24em" }}
              >
                <div
                  class="absolute left-0 bottom-0 w-full h-full z-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
                  }}
                ></div>
                <img
                  src={post.jetpack_featured_media_url}
                  class="absolute left-0 top-0 w-full h-full z-0 object-cover"
                />
                <div class="p-4 absolute bottom-0 left-0 z-20">
                  {/* <a
                  href="#"
                  class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
                >
                  Nutrition
                </a> */}
                  <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
                    {post.title.rendered}
                  </h2>
                  <div class="flex mt-3">
                    <div>
                      <p class="font-semibold text-gray-400 text-xs">
                        {moment(post.modified).format("MMM Do")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                ></div>
              </div>
            </main>
          )
        )}
      </div>
    </div>
  );
}