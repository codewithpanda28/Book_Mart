'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { toggleLoginDialog } from '@/store/slice/userSlice'
import { RootState } from '@/store/store'

import { BookLock, ChevronRight, FileTerminal, Heart, HelpCircle, Lock, LogOut, Menu, Package, PiggyBank, ShoppingCart, User, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { HiSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import AuthPage from './AuthPage'


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const router = useRouter
  const dispatch = useDispatch()
  const isLoginOpen = useSelector((state: RootState) => state.user.isLoginDialongOpen)
  const user = useSelector((state: RootState) => state.user.user)

  const userPlaceholder = 'AK'

  const handleLoginClick = () => {
    dispatch(toggleLoginDialog())
  }

  const handleProtectionNavigation = (href: string) => {
    if (user) {
      router.push(href)
      setIsDropdownOpen(false)
    } else {
      dispatch(toggleLoginDialog())
    }
  }

  const handleLogout = () => { }

  const menuItems = [
    ...(user ? [
      {
        label: 'Profile',
        href: '/account/profile',
        icon: <User className='h-4 w-4' />,
        content: (
          <div className='flex space-x-4 items-center p-2 border-b'>
            <Avatar className='w-12 h-12 -mt-2 rounded-full'>
              {user.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt='user_image' className='object-cover' />
              ) : (
                <AvatarFallback>{userPlaceholder}</AvatarFallback>
              )}
            </Avatar>
            <div className='flex flex-col w-full'>
              <span className='font-semibold text-md'>
                {user.name}
              </span>
              <span className='text-gray-500'>{user.email}</span>
            </div>
          </div>
        )
      }
    ] : [
      {
        icon: <Lock className='h-4 w-4' />,
        label: 'Login / Sign Up',
        onClick: handleLoginClick
      }
    ]),
    {
      icon: <User className='h-4 w-4' />,
      label: 'My Profile',
      onClick: () => handleProtectionNavigation('/account/profile')
    },
    {
      label: 'My Orders',
      onClick: () => handleProtectionNavigation('/account/orders'),
      icon: <Package className='h-4 w-4' />
    },
    {
      label: 'My Selling Order',
      onClick: () => handleProtectionNavigation('/account/selling-products'),
      icon: <PiggyBank className='h-4 w-4' />
    },
    {
      label: 'My Cart',
      onClick: () => handleProtectionNavigation('/checkout/cart'),
      icon: <ShoppingCart className='h-4 w-4' />
    },
    {
      label: 'My Wishlist',
      onClick: () => handleProtectionNavigation('/account/wishlist'),
      icon: <Heart className='h-4 w-4' />
    },
    {
      label: 'About Us',
      href: '/about-us',
      icon: <User2 className='h-4 w-4' />
    },
    {
      label: 'Terms & Use',
      href: '/terms-of-use',
      icon: <FileTerminal className='h-4 w-4' />
    },
    {
      label: 'Privacy Policy',
      href: '/privacy-policy',
      icon: <BookLock className='h-4 w-4' />
    },
    {
      label: 'Help',
      href: '/how-it-works',
      icon: <HelpCircle className='h-4 w-4' />
    },
    {
      label: 'Logout',
      onClick: handleLogout,
      icon: <LogOut className='h-4 w-4' />
    }
  ]

  const MenuItems = ({ className = '' }) => (
    <div className={className}>
      {menuItems.map((item, index) => (
        item.href ? (
          <Link key={index}
            href={item.href}
            className='flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-200 rounded-lg'
            onClick={() => setIsDropdownOpen(false)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.content && <div className='mt-1'>{item.content}</div>}
            <ChevronRight className='w-4 h-4 ml-auto' />
          </Link>
        ) : (
          <button key={index}
            className='flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-200 rounded-lg'
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
            <ChevronRight className='w-4 h-4 ml-auto' />
          </button>
        )
      ))}
    </div>
  )

  return (
    <header className='bg-white border-b'>
      <div className='container w-[80%] mx-auto hidden lg:flex items-center justify-between p-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/images/web-logo.png' alt='logo' width={100} height={100} className='h-15 w-auto' />
        </Link>

        <div className='flex flex-1 items-center justify-center max-w-xl px-4'>
          <div className='relative w-full'>
            <Input
              type='text'
              placeholder='Book Name / Author Name / Subject / Publisher'
              className='w-full pl-10'
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 transition duration-300 hover:text-primary cursor-pointer'>
              <HiSearch size={20} />
            </span>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <Link href='/book-sell'>
            <Button variant='secondary' className='bg-yellow-400 hover:bg-yellow-600 text-gray-900'>Sell Used Book</Button>
          </Link>



          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex items-center'>
                <Avatar className='w-8 h-8 rounded-full flex justify-center items-center'>
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user.profilePicture}
                      alt='user_image'
                      className='object-cover w-full'
                    />
                  ) : (
                    <AvatarFallback >{userPlaceholder}</AvatarFallback>
                  )}
                </Avatar>
                My Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-80 p-2'>
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href='/checkout/cart'>
            <div className='relative'>
              <Button variant='ghost' className='relative'>
                <ShoppingCart className='w-5 h-5  mr-2' />
                Cart
              </Button>
              {user && (
                <span className='absolute top-1 left-8 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs'>30</span>
              )}
            </div>
          </Link>
        </div>

      </div>


      {/* Mobile Header */}

      <div className='container mx-auto flex lg:hidden items-center justify-between p-4'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <Menu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'} className='w-80 p-0'>
            <SheetHeader>
              <SheetTitle className='sr-only'>Menu</SheetTitle>
            </SheetHeader>

            <div className='border-b p-4'>
              <Link href='/' className='flex items-center gap-2'>
                <Image src='/images/web-logo.png' alt='logo' width={150} height={40} className='h-15 w-auto' />
              </Link>

            </div>

            <MenuItems className='p-4' />
          </SheetContent>
        </Sheet>
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/images/web-logo.png' alt='logo' width={100} height={100} className='h-6 md:h-10 w-20 md:w-auto' />
        </Link>

        <div className='flex flex-1 items-center justify-center max-w-xl px-4'>
          <div className='relative w-full'>
            <Input
              type='text'
              placeholder='Search...'
              className='w-full pl-10'
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 transition duration-300 hover:text-primary cursor-pointer'>
              <HiSearch size={20} />
            </span>
          </div>
        </div>
        <Link href='/checkout/cart'>
          <div className='relative'>
            <Button variant='ghost' className='relative'>
              <ShoppingCart className='w-5 h-5  mr-2' />
            </Button>
            {user && (
              <span className='absolute top-1 left-8 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs'>30</span>
            )}
          </div>
        </Link>

      </div>
      <AuthPage isLoginOpen={isLoginOpen} setLoginOpen={handleLoginClick} />
    </header>
  )
}

export default Header

