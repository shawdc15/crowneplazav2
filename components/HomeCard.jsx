import React from 'react'
import Image from 'next/image'
const HomeCard = () => {
  const items = [
    {
      title: 'Explore Hotel from us',
      subTitle: 'There is always something new to experience here.',
      description:
        'Continue to make GREAT MEMORIES and explore new ways to enjoy the city with our packages.',
      image: '/hotel1.jpg',
    },
    {
      title: 'Art of doing nothing',
      subTitle: 'There is always something new to experience here.',
      description:
        'Continue to make GREAT MEMORIES and explore new ways to enjoy the city with our packages.',
      image: '/hotel4.png',
    },
    {
      title: 'I Love View',
      subTitle: 'There is always something new to experience here.',
      description:
        'Continue to make GREAT MEMORIES and explore new ways to enjoy the city with our packages.',
      image: '/hotel2.jpg',
    },
  ]
  return (
    <div className=" mx-auto max-w-container">
      <div className="mt-20">
        {items.map(({ title, subTitle, description, image }, index) => (
          <div
            key={index}
            className={`${
              index % 2 && 'lg:flex-row-reverse'
            } mb-10 flex  w-full flex-col items-center justify-center gap-5 px-6 lg:flex-row`}
          >
            <img
              src={image}
              className="m-5 h-80 rounded-lg object-cover drop-shadow-md"
            />
            <div className="p-5">
              <p className="mb-5 text-3xl font-bold text-slate-900">{title}</p>
              <p className="mb-2 text-lg text-emerald-500">{subTitle}</p>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeCard
