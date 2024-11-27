import React from "react";

export default function Form() {
  return (
    <div className="w-full">
      <form class="max-w-sm mx-auto bg-white p-5 w-full rounded-md">
        
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm text-start font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm text-start font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm text-start font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
