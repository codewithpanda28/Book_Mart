import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { books } from '@/lib/Constant'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'

const NewBooks = () => {
  const [currentBookSlide, setCurrentBookSlide] = React.useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBookSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const prevSlide = () => {
    setCurrentBookSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
  };

  const NextSlide = () => {
    setCurrentBookSlide((prevSlide) => (prevSlide + 1) % 3);
  };

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.floor((price - finalPrice) / price * 100);
    }
    return 0;
  }

  return (
    <section className='py-16 bg-gray-50 '>
      <div className='container mx-auto px-4 '>
        <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center' >Newly Added Books</h2>
        <div className='relative '>
          {books.length > 0 ? (
            <>
              <div className='overflow-hidden'>
                <div className='flex transition-transform duration-500 ease-in-out '
                  style={{
                    transform: `translateX(-${currentBookSlide * 100}%)`,
                  }}
                >
                  {[0, 1, 2].map((slideIndex) => (
                    <div key={slideIndex} className='w-full  relative flex-none'>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {books.slice(slideIndex * 3, slideIndex * 3 + 3).map((book) => (
                          <Card key={book._id} className='w-full h-full relative'>
                            <CardContent className='p-4'>
                              <Link href={`/books/${book._id}`}>
                                <div className='relative'>
                                  <Image src={book.images[0]} alt={book.title} width={200} height={300} className='object-cover' />
                                  {calculateDiscount(book.price, book.finalPrice) > 0 && (
                                    <span className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full'>
                                      {calculateDiscount(book.price, book.finalPrice)}% off
                                    </span>
                                  )}
                                </div>
                                <h3 className='mb-2 line-clamp-2  font-medium '>
                                  {book.title}
                                </h3>
                                <div className='flex items-center justify-between'>
                                  <div className='flex items-baseline gap-2'>
                                    <span className='text-lg font-bold'>₹{book.finalPrice}</span>
                                    {book.price && (
                                      <span className='text-sm text-muted-foreground line-through'>₹{book.price}</span>
                                    )}
                                  </div>
                                  <div className='flex justify-between items-center text-xs text-zinc-400'>
                                    <span >{book.condition}</span>
                                  </div>
                                </div>
                                <div className='pt-4'>
                                  <Button className='flex float-end mb-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'>Buy Now</Button>
                                </div>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                 {/* scroll bar */}
          <button className='absolute left-10 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-3 hover:bg-gray-100'
           onClick={prevSlide}>
            <ChevronLeft className='w-6 h-6 text-gray-700' />
          </button>
          
          <button className='absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-3 hover:bg-gray-100' onClick={NextSlide}>
            <ChevronRight className='w-6 h-6 text-gray-700' />
          </button>

          {/* dot animation */}
          <div className='mt-8 flex justify-center space-x-2 '>
            {[0, 1, 2].map((dot) => (
              <button key={dot}
                className={`relative w-6 h-6 rounded-full  ${
                  currentBookSlide === dot?'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentBookSlide(dot)}
              />
            ))}
          </div>

            </>
          ) : (
            <p className='text-center text-gray-600 '>No Books Found.</p>
          )}
        </div>
      </div>

    </section>
  )
}

export default NewBooks
