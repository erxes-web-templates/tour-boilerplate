// import { fetchBmTours } from "@/lib/fetchTours";
"use client";

import Link from "next/link";
import React from "react";

const page = () => {
  // const { list } = await fetchBmTours();

  // console.log(list, " list");
  return (
    <>
      <ul>
        {/* {list.map((tour) => (
          <li key={tour._id}>
            <Link href={`/tours/${tour._id}`}>{tour.name}</Link>
          </li>
        ))} */}
      </ul>
    </>
  );
};

export default page;
