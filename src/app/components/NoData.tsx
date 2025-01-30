import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface NoDataProps {
  message: string
  imageUrl: string
  description: string
  onClick: () => void
  buttonText: string
}

const NoData = ({message, imageUrl, description, onClick, buttonText}: NoDataProps) => {
  return (
    <div className='flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md overflow-hidden space-y-6 mx-auto'>
        <div className='relative w-60 md:w-8'>

            <Image
              src={imageUrl}
              alt={message}
              width={300}
              height={300}
              className='rounded-lg shadow-md transition duration-300 hover:shadow-lg'
            />

            <div className='text-center max-w-md space-y-2'>
                <p className='text-3xl font-bold text-gray-900 tracking-wide'>{message}</p>
                <p className='text-gray-600 text-lg leading-relaxed'>{description}</p>
            </div>

            {onClick && (
                <Link href='/'>
                    <a className='px-6 w-60 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 transition duration-300'>{buttonText}</a>
                </Link>
            )}

        </div>
    </div>
  )
}

export default NoData
