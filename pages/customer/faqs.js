import Head from 'next/head'
import React, { useEffect } from 'react'
import { Header, Footer } from '../../components'

const Faqs = () => {
  useEffect(() => {
    console.log('rerednder')
  })
  const items = [
    {
      title:
        "How can I get more information about the room or property's facility?",
      description:
        'You can find details about the property in your confirmation email or on the property detail page. For anything else, you can also contact property directly.',
    },
    {
      title: 'When do I get a confirmation email?',
      description:
        "In most cases, you will receive this email along with the booking voucher (PDF file) within 30 minutes of booking. If you still haven't received it after that time, please check your junk mail and/or spam filters. You can also download or resend your booking voucher online.",
    },
    {
      title: 'Where can I check my booking details and status?',
      description: `You can always view your booking details and status online by signing in and selecting "My bookings" from the account menu. If you don't know your sign in details, you can follow the "My bookings" link in your confirmation email.`,
    },
    {
      title: 'Can you resend the booking voucher to me?',
      description: `Jiro now provides you with a self-service option. Just by clicking on the self-service link provided in your confirmation email, you will be able to resend your booking voucher.`,
    },
  ]
  return (
    <>
      <Head>
        <title>Faq's | Crowné Plaza</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="faqs" />
      <div className="mx-auto max-w-container">
        <div className="my-4 mx-6">
          <p className="mb-4 p-4 text-center text-3xl font-bold text-slate-900">
            Need help? We're here for you!
          </p>
          {items.map(({ title, description }, index) => (
            <div key={index} className="mb-4 rounded-lg border p-4 px-6">
              <p className="py-4 text-xl text-slate-900">{title}</p>
              <div>
                <p className="mb-4 text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Faqs
