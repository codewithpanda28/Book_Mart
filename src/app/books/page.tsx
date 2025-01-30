'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { books, filters } from '@/lib/Constant'
import { BookAIcon, Filter, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { formatDate, formatDistanceToNow } from 'date-fns'
import BookLoader from '@/lib/BookLoader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Pagination from '../components/Pagination'
import NoData from '../components/NoData'
import { Router, useRouter } from 'next/navigation'

const page = () => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const [selectedCondition, setSelectedCondition] = React.useState<string[]>([])
    const [selectedType, setSelectedType] = React.useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([])
    const [sortOption, setSortOption] = React.useState('newest')
    const bookPerPage = 6;
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()


    const togglefilter = (section: string, item: string) => {
        const updateFilter = (prev: string[]) => {
            return prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        }
        switch (section) {
            case 'condition':
                setSelectedCondition(updateFilter)
                break;
            case 'classType':
                setSelectedType(updateFilter)
                break;
            case 'category':
                setSelectedCategory(updateFilter)
                break;
        }
        setCurrentPage(1)
    }

    const filterBooks = books.filter((book) => {
        const conditionMatch = selectedCondition.length === 0 || selectedCondition.map(cond => cond.toLowerCase()).includes(book.condition.toLowerCase())
        const typeMatch = selectedType.length === 0 || selectedType.map(cond => cond.toLowerCase()).includes(book.classType.toLowerCase())
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.map(cond => cond.toLowerCase()).includes(book.category.toLowerCase())
        return conditionMatch && typeMatch && categoryMatch
    })

    const sortedBooks = [...filterBooks].sort((a, b) => {
        switch (sortOption) {
            case 'newest':
                return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            case 'oldest':
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            case 'priceLow':
                return a.finalPrice - b.finalPrice
            case 'priceHigh':
                return b.finalPrice - a.finalPrice
            default:
                return 0
        }

    })

    const totalPages = Math.ceil(sortedBooks.length / bookPerPage)
    const paginatedBooks = sortedBooks.slice((currentPage - 1) * bookPerPage, currentPage * bookPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const calculateDiscount = (price: number, finalPrice: number): number => {
        if (price > finalPrice && price > 0) {
            return Math.floor((price - finalPrice) / price * 100);
        }
        return 0;
    }

    const formateDate = (dateString: Date) => {
        const date = new Date(dateString)

        return formatDistanceToNow(date, { addSuffix: true })
    }


    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='container mx-auto px-4 py-8'>
                <nav className='mb-8 flex items-center gap-2 text-sm text-muted-foreground'>
                    <Link href='/' className='hover:underline text-primary'> Home</Link>
                    <span>/</span>
                    <Link href='/books' className='hover:underline text-primary'> Books</Link>
                </nav>
                <h1 className='mb-8 text-3xl font-bold '>
                    {" "}
                    Find from over 1000+ of used books online{""}
                </h1>
                <div className='grid gap-8 md:grid-cols-[280px_1fr]'>
                    <div className='space-y-6'>
                        <Accordion type='multiple' className='bg-white p-6 border rounded-lg'>
                            {Object.entries(filters).map(([key, values]) => (
                                <AccordionItem key={key} value={key} className='border-b last:border-b-0'>
                                    <AccordionTrigger className='text-lg font-semibold text-blue-500'>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className='mt-2 space-y-2'>
                                            {values.map((value) => (
                                                <div key={value} className='flex items-center gap-2'>
                                                    <Checkbox id={value} checked={key === 'condition' ? selectedCondition.includes(value) : key === 'classType' ? selectedType.includes(value) : key === 'category' ? selectedCategory.includes(value) : false} onClick={() => togglefilter(key, value)} />
                                                    <label htmlFor={value} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                                        {value}
                                                    </label>
                                                </div>
                                            ))}

                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className='space-y-6'>
                        {isLoading ? (
                            <BookLoader />
                        ) : paginatedBooks.length ? (
                            <>
                                <div className='flex justify-between'>
                                    <div className='mb-8 text-xl font-semibold'>Buy Second Hand Books Online at Best Price</div>
                                    <Select
                                        value={sortOption}
                                        onValueChange={(value) => setSortOption(value)}
                                    >
                                        <SelectTrigger className='w-[220px]'>
                                            <SelectValue placeholder='Sort By' />
                                            <SelectContent>
                                                <SelectItem value='newest'>Newest First</SelectItem>
                                                <SelectItem value='oldest'>Oldest First</SelectItem>
                                                <SelectItem value='priceLow'>Price Low to High</SelectItem>
                                                <SelectItem value='priceHigh'>Price High to Low</SelectItem>
                                            </SelectContent>
                                        </SelectTrigger>
                                    </Select>
                                </div>

                                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                                    {paginatedBooks.map((book) => (
                                        <motion.div key={book._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <Card className='group relative overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-2xl bg-white border-0'>
                                                <CardContent className='p-0'>
                                                    <Link href={`/books/${book._id}`}>
                                                        <div className='relative '>
                                                            <Image
                                                                src={book.images[0]}
                                                                alt={book.title}
                                                                width={400}
                                                                height={300}
                                                                className='h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                                            />
                                                            <div className='absolute left-0 top-0 z-10 flex flex-col p-2'>
                                                                {calculateDiscount(book.price, book.finalPrice) > 0 && (
                                                                    <Badge className='bg-orange-600/90 text-white hover:bg-orange-700'>
                                                                        {calculateDiscount(book.price, book.finalPrice)}% Off
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <Button size='icon' variant='ghost' className='absolute right-2 top-2 z-20 w-8 rounded-full bg-white text-black shadow-md hover:bg-gray-200'>
                                                                <Heart className='h-4 w-4 text-red-500' />
                                                            </Button>
                                                        </div>

                                                        <div className='p-4 space-y-2'>
                                                            <div className='flex items-start justify-between'>
                                                                <h3 className='text-lg font-semibold text-zinc-500 truncate'>
                                                                    {book.title}
                                                                </h3>
                                                            </div>
                                                            <div className='flex items-center justify-between'>
                                                                <p className='text-sm text-muted-foreground'>{book.author}</p>
                                                                <div className='flex items-center space-x-2'>
                                                                    <p className='text-sm font-semibold line-through text-red-500'>${book.price}</p>
                                                                    <p className='text-lg font-bold text-green-600'>${book.finalPrice}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center justify-between'>
                                                                <p className='text-sm text-muted-foreground'>Condition: {book.condition}</p>
                                                                <p className='text-sm text-muted-foreground'>{book.classType}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </CardContent>
                                                <div className='absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-500/20 blur-3xl transition-all duration-500 group-hover:right-4 group-hover:top-4' />
                                                <div className='absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-green-500/20 blur-3xl transition-all duration-500 group-hover:right-4 group-hover:top-4' />

                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(sortedBooks.length / bookPerPage)}
                                    onPageChange={handlePageChange}

                                />
                            </>
                        ) : (
                            <>
                                <NoData
                                    imageUrl="/images/no-book.jpg"
                                    message="No books available please try later."
                                    description="Try adjusting your filters or search criteria to find what you're looking for."
                                    onClick={() => Router.push("/book-sell")}
                                    buttonText="Shell Your First Book"
                                />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page
