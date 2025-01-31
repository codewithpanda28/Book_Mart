'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle2, Heart, Loader2, ShoppingCart, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useParams()
  const id = params.id
  const [selectedImage, setSelectedImage] = React.useState(0)
  const router = useRouter()
  const [isAddToCart, setIsAddToCart] = React.useState(false)

  const book = {
    _id: "1",
    images: [
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwc2VsbCUyMGJvb2tzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1492539438225-2666b2a98f93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9sZCUyMCUyMGJvb2tzfGVufDB8fDB8fHww",
    ],
    title: "The Alchemist",
    category: "Reading Books (Novels)",
    condition: "Excellent",
    classType: "B.Com",
    subject: "Fiction",
    price: 300,
    author: "Paulo Coelho",
    edition: "25th Anniversary Edition",
    description: "A philosophical book about a shepherd's journey to realize his dreams.",
    finalPrice: 250,
    shippingCharge: 50,
    paymentMode: "UPI",
    paymentDetails: {
      upiId: "example@upi",
    },
    createdAt: new Date("2024-01-01"),
    seller: {
      name: "John Doe",
      contact: "1234567890",
      address: {


        state: "Delhi",

      },
    },
  }

  const handleAddToCart = () => {
    setIsAddToCart(true)
    router.push('/cart')
  }

  const handleAddToWishlist = () => {
    setIsAddToCart(true)
    router.push('/wishlist')
  }

  const bookImage = book?.images || []

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.floor(((price - finalPrice) / price) * 100)
    }
    return 0
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)

    return formatDistanceToNow(date, { addSuffix: true })
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-8'>
        <nav className='mb-8 flex items-center gap-2 text-sm text-muted-foreground'>
          <Link href='/' className='hover:underline text-primary'>
            Home
          </Link>
          <span>/</span>
          <Link href='/books' className='hover:underline text-primary'>
            Books
          </Link>
          <span>/</span>
          <span className='hover:underline text-primary'>{book.category}</span>
          <span>/</span>
          <span className='hover:underline text-primary'>{book.title}</span>
        </nav>

        <div className='grid gap-8 md:grid-cols-2'>
          <div className='space-y-6'>
            <div className='relative h-[400px] overflow-hidden rounded-lg border bg-white shadow-md'>
              <Image
                src={bookImage[selectedImage]}
                alt={book.title}
                fill
                className='object-contain'
              />

              {calculateDiscount(book.price, book.finalPrice) > 0 && (
                <span className='absolute left-0 top-2 rounded-r-lg px-2 py-1 text-xs font-medium bg-orange-600/90 text-white hover:bg-orange-700'>
                  {calculateDiscount(book.price, book.finalPrice)}% Off
                </span>
              )}
            </div>

            <div className='flex gap-2 overflow-hidden scrollbar-none'>
              {bookImage.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg border bg-white shadow-md ${selectedImage === index ? 'border-2 border-orange-500' : 'hover:scale-105'
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${book.title} ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Book Details */}
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-semibold text-black'>{book.title}</h1>
                <p className='text-sm text-muted-foreground'>
                  Posted {formatDate(book.createdAt)}
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline'>
                  Share
                </Button>
                <Button variant='outline' size='sm' onClick={() => handleAddToWishlist(book.id)}>
                  <Heart className='h-4 w-4 mr-1 fill-red-500' />
                  <span className='hidden md:inline'>Add</span>
                </Button>
              </div>
            </div>

            {/* price */}
            <div className='flex items-baseline gap-2'>
              <span className='text-3xl font-bold'>₹{book.finalPrice}</span>
              {book.price && (
                <span className='text-lg text-muted-foreground line-through'>₹{book.price}</span>
              )}

              <Badge variant='secondary' className='text-green-600'>Shipping Available</Badge>
            </div>

            <Button className='w-60 py-6 bg-blue-700 '>
              {isAddToCart ? (
                <>
                  <Loader2 className='animate-spin mr-2 h-4 w-4' />
                  Adding to Cart...

                </>
              ) : (
                <>
                  <ShoppingCart className='mr-2 h-4 w-4' />
                  Buy Now
                </>
              )}
            </Button>

            <Card className='border border-gray-200 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-2xl'>About this book</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div className='font-medium text-muted-foreground' >Subject/Title</div>
                  <div>
                    {book.subject}/{book.title}
                  </div>
                  <div className='font-medium text-muted-foreground' >Course</div>
                  <div>
                    {book.classType}
                  </div>
                  <div className='font-medium text-muted-foreground' >Category</div>
                  <div>
                    {book.category}
                  </div>
                  <div className='font-medium text-muted-foreground' >Author</div>
                  <div>
                    {book.author}
                  </div>
                  <div className='font-medium text-muted-foreground' >Edition</div>
                  <div>
                    {book.edition}
                  </div>
                  <div className='font-medium text-muted-foreground' >Condition</div>
                  <div>
                    {book.condition}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        <div className='mt-8 grid gap-8 md:grid-cols-2'>
          <Card className='border-none shadow-md'>
            <CardHeader>
              <CardTitle className='text-2xl'>Description</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <p>{book.description}</p>
              <div className='border-t pt-4'>
                <h3 className='font-medium mb-2'>Our Community</h3>
                <p className='text-sm text-muted-foreground'>
                  Read more about our community, meet other readers, and share your thoughts on books. We will provide a platform for you to connect with fellow readers and discuss books.
                </p>
                <div className='grid grid-cols-1 gap-2 text-muted-foreground mt-4'>
                  <div>
                    Ad Id: {book._id}
                  </div>
                  <div>
                    Posted: {formatDate(book.createdAt)}
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>

          {/* Book Seller Detail */}
          <Card className='border-none shadow-md'>
            <CardHeader>
              <CardTitle className='text-2xl'>Sold By</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-12 h-12 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center'>
                  <User2 className='h-6 w-6 text-primary-foreground' />
                </div>
                <div>
                  <p className='font-medium text-lg'>{book.seller.name}</p>
                  <p className='text-sm text-muted-foreground flex items-center space-x-1'>
                    <CheckCircle2 className='h-4 w-4 text-green-600' />
                    <span className='text-green-600'>Verified</span>
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <p>
                  <span className='font-medium text-gray-900'>Contact: </span>
                  <span className='text-sm text-muted-foreground'>{book.seller.contact}</span>
                </p>
                <p>
                  <span className='font-medium text-gray-900'>Address: </span>
                  <span className='text-sm text-muted-foreground'>{book.seller.address.state}</span>
                </p>
              </div>
              <div className='text-sm text-muted-foreground'>
                <p className='mb-2'>
                  Please do not send any payment outside of this platform. We will never ask you to send payment to a bank account or any other payment method.
                </p>
                <p>
                  For any issues or disputes, please contact us at{' '}
                  <a
                    href='mailto:hello@oldbooks.in'
                    className='text-primary-foreground underline'
                  >
                    hello@oldbooks.in
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* how it work section */}
        <section className='mt-12  shadow-md p-8 rounded-md'>
          <h2 className='text-2xl mb-8 font-bold text-center'>How it works?</h2>
          <div className='grid gap-8 md:grid-cols-3'>
            {[
              {
                step: "Step 1",
                title: "Seller posts an Ad",
                description:
                  "Seller posts an ad on book kart to sell their used books.",
                image: { src: "/icons/ads.png", alt: "Post Ad" },
              },
              {
                step: "Step 2",
                title: "Buyer Pays Online",
                description:
                  "Buyer makes an online payment to book kart to buy those books.",
                image: { src: "/icons/pay_online.png", alt: "Payment" },
              },
              {
                step: "Step 3",
                title: "Seller ships the books",
                description: "Seller then ships the books to the buyer",
                image: { src: "/icons/fast-delivery.png", alt: "Shipping" },
              },
            ].map((item, index) => (
              <Card
                className='shadow-md hover:shadow-lg transition duration-200 ease-in-out'
              >
                <CardHeader>
                  <CardTitle className='text-2xl'>{item.step}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center space-x-6'>
                    <Image src={item.image.src} alt={item.image.alt} width={50} height={50} />
                    <div>
                      <h3 className='font-bold text-lg'>{item.title}</h3>
                      <p className='text-sm'>{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>

  )
}

export default page

