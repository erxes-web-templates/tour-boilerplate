"use client";

import React from "react";
import BookingForm from "./_components/BookingForm";
import useCurrentUser from "@/lib/useAuth";
import Link from "next/link";

const BookingPage = () => {
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    //save current path to redirect after login
    const redirectPath = window.location.pathname + window.location.search;

    localStorage.setItem("redirectPath", redirectPath);
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-2xl font-bold">Please log in to book a tour</h1>
          <p>
            Once you logged in you refer to the booking form to proceed with
            your booking.
          </p>
          <Link href="/auth/login" className="text-blue-500 underline">
            Log in
          </Link>
          <p className="mt-4">{`If you don't have an account, please register.`}</p>
          <Link href="/auth/register" className="text-blue-500 underline">
            Register
          </Link>
          <p className="mt-4">If you have any questions, please contact us.</p>
          <Link href="/contact" className="text-blue-500 underline">
            Contact Us
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BookingForm />
    </div>
  );
};

export default BookingPage;
