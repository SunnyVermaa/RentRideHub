import React from 'react'
import '../../css/Footer.css'

const Footer = () => {
  return (
    <>
    <footer> 

    <div className="bg-gray-900 text-white py-12 px-6 md:px-20 rounded-t-3xl shadow-inner">
    <div className="max-w-6xl mx-auto space-y-6">
    <h2 className="text-3xl font-semibold text-white text-center">About RentRide Hub</h2>
    <p className="text-gray-400 leading-relaxed">
      <strong>RentRide Hub</strong> is a user-friendly platform built with React, Node.js, Express, and MongoDB. It enables people to easily book rides or rent vehicles for daily use, long trips, or special events like weddings and corporate functions. Designed for convenience and safety, it includes verified drivers, transparent pricing, real-time tracking, and flexible rental options. Unlike traditional taxi apps, RentRide Hub focuses on longer-term rentals and diverse transport needs, providing a one-stop solution for all travel plans.
    </p>
    
  </div>
  <div className="text-center mb-8 mt-20">
    <h2 className="text-3xl md:text-4xl font-bold tracking-wide">Get in touch</h2>
    <p className="text-gray-400 mt-2">We'd love to hear from you. Let's start a conversation.</p>
  </div>
  <form className="max-w-3xl mx-auto space-y-6 "  action={`https://formsubmit.co/${import.meta.env.VITE_EMAIL}`} method="POST">
   <div className="flex gap-x-5">
   <input type="hidden" name="_captcha" value="false" />
   <input type="hidden" name="_next" value={`${import.meta.env.VITE_BASE_URL_FRONT}`} />
   <input
      type="text"
      placeholder="Your name"
      name="name"
      required
      className="w-6/12 p-4 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
    />
    <input
      type="email"
      name="email"
      required
      placeholder="email@gmail.com"
      className="w-6/12 p-4 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400"
    />
   </div>
    <textarea
      placeholder="Your need / query"
      rows="5"
      name="message"
      required
      className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500  placeholder:text-gray-400 resize-none "
    ></textarea>
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-3 rounded-xl"
    >
      Send Message
    </button>
  </form>
  <div className="text-sm text-gray-500 mt-20">
      &copy; {new Date().getFullYear()} RentRide Hub by Sunny Verma. All rights reserved.
    </div>
</div>
    </footer>
  

    </>
  )
}

export default Footer