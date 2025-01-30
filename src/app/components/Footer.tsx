import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
   <footer className='container bg-gray-900 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-xl font-semibold mb-4'><Link href='/about'>About Us</Link></h3>
            <p className='text-gray-300'>
              BookKart is an online marketplace for buying and selling used books.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Contact Us</h3>
            <p className='text-gray-300'>
              Email: codewithpanda28@gmail.com
            </p>
            <p className='text-gray-300'>
              Phone: +91 8252472186
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
            <ul className='flex space-x-4'>
              
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                  <LinkedinIcon className='h-6 w-6 animate-bounce' />
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                  <InstagramIcon className='h-6 w-6 animate-bounce' />
                </a>
              </li>
            
              <li>
                <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                  <FacebookIcon className='h-6 w-6 animate-bounce' />
                </a>
              </li>

              <li>
                <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                  <GithubIcon className='h-6 w-6 animate-bounce' />
                </a>
              </li>
            
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Legal</h3>
            <ul className='space-y-2'>
              <li><a href='/terms-of-use' className='text-gray-300 hover:text-white'>Terms of Service</a></li>
              <li><a href='/privacy-policy' className='text-gray-300 hover:text-white'>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className='mt-8 flex justify-between pr-48'>
          <p className='text-gray-300'>&copy; {new Date().getFullYear()} BookKart. All rights reserved.</p>
          <ul className='flex space-x-4'>
            <li>
              <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                <Image className='h-16 w-16 ' src='/icons/visa.svg' width={30} height={30} 
                  
                 alt='visa' />
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                <Image className='h-16 w-16 ' src='/icons/rupay.svg' width={30} height={30} 
                  
                 alt='paytm' />
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                <Image className='h-16 w-16 ' src='/icons/paytm.svg' width={30} height={30} 
                  
                 alt='repay' />
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-300 hover:text-white transition duration-300 ease-in-out hover:scale-110'>
                <Image className='h-16 w-16 ' src='/icons/upi.svg' width={30} height={30} 
                  
                 alt='upi' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
