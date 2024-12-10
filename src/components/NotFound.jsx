import React from "react";

export default function Notfound() {
  return (
    <>
      <section class="w-screen min-h-screen content-center" style={{ backgroundColor: "#394867" }}>
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl ">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
              Something's missing.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <a
              href="javascript:history.back()"
              class="inline-flex text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
              Return Back
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
