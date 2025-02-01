import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

interface LoginProps {
    isLoginOpen: boolean
    setLoginOpen: (open: boolean) => void
}

interface LoginFormData {
    email: string
    password: string
}
interface SignupFormData {
    name: string
    email: string
    password: string
    agreeTerms: boolean
}

interface ForgotPasswordFormData {
    email: string
}

const AuthPage: React.FC<LoginProps> = ({ isLoginOpen, setLoginOpen }) => {
    const [currentTab, setCurrentTab] = React.useState<'login' | 'signup' | 'forgot'>('login')
    const [showPassword, setShowPassword] = React.useState(false)
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = React.useState(false)
    const [loginLoading, setLoginLoading] = React.useState(false)
    const [forgotPasswordLoading, setForgotPasswordLoading] = React.useState(false)
    const [signupLoading, setSignupLoading] = React.useState(false)
    const [googleLoading, setGoogleLoading] = React.useState(false)

    const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: LoginError } } = useForm<LoginFormData>()
    const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: SignupError } } = useForm<SignupFormData>()
    const { register: registerForgotPassword, handleSubmit: handleForgotPasswordSubmit, formState: { errors: forgotPasswordError } } = useForm<ForgotPasswordFormData>()

    return (
        <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
            <DialogContent className='w-full max-w-md rounded-lg p-6 sm:max-w-[425px]'>
                <DialogHeader className='flex flex-col space-y-2 text-center'>
                    <DialogTitle className='text-2xl font-bold mb-4 font-semibold'>
                        Welcome to the Book Kart
                    </DialogTitle>
                    <Tabs
                        value={currentTab}
                        onValueChange={(value) => setCurrentTab(value as 'login' | 'signup' | 'forgot')}>
                        <TabsList className='grid w-full grid-cols-3 mb-6'>
                            <TabsTrigger value='login'>Login</TabsTrigger>
                            <TabsTrigger value='signup'>Signup</TabsTrigger>
                            <TabsTrigger value='forgot'>Forgot</TabsTrigger>
                        </TabsList>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* login */}
                                <TabsContent value='login' className='flex flex-col space-y-4'>
                                    <form className='flex flex-col space-y-4' onSubmit={handleLoginSubmit}>
                                        <div className='relative'>
                                            <Input
                                                placeholder='Email'
                                                type='email'
                                                className='pl-10'
                                                {...registerLogin('email', {
                                                    required: {
                                                        value: true,
                                                        message: "Email is required"
                                                    }
                                                })}
                                            />
                                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                        </div>
                                        {LoginError?.email && <p className='text-red-500 text-sm'>{LoginError.email.message}</p>}

                                        <div className='relative'>
                                            <Input
                                                placeholder='Password'
                                                type={showPassword ? 'text' : 'password'}
                                                className='pl-10'
                                                {...registerLogin('password', {
                                                    required: {
                                                        value: true,
                                                        message: "Password is required"
                                                    }
                                                })}
                                            />
                                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                            {showPassword ? (
                                                <EyeOff
                                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                                    onClick={() => setShowPassword(false)}
                                                    size={20}
                                                />
                                            ) : (
                                                <Eye
                                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                                    onClick={() => setShowPassword(true)}
                                                    size={20}
                                                />
                                            )}
                                        </div>
                                        {LoginError?.password && <p className='text-red-500 text-sm'>{LoginError.password.message}</p>}



                                        <Button type='submit' className='w-full'>{loginLoading ? (
                                            <>
                                                <Loader2 className='animate-spin mr-2 h-4 w-4' />


                                            </>
                                        ) : (
                                            <>
                                                Login
                                            </>
                                        )}</Button>

                                    </form>

                                    <div className='flex items-center justify-center space-x-2 mt-4'>
                                        <div className='flex-1 h-px bg-gray-300'></div>
                                        <p className='mx-2 text-gray-500 text-sm'>Or</p>
                                        <div className='flex-1 h-px bg-gray-300'></div>
                                    </div>
                                    <Button className='w-full flex items-center justify-center gap-2
                                        bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 mt-4'>
                                        {googleLoading ? (
                                            <>
                                                <Loader2 className='animate-spin mr-2 h-4 w-4' />
                                                Login to Google...
                                            </>
                                        ) : (
                                            <>
                                                <Image
                                                    src='/icons/google.svg'
                                                    alt='google'
                                                    width={20}
                                                    height={20}
                                                />

                                                Login with Google
                                            </>
                                        )}
                                    </Button>

                                </TabsContent>

                                {/* sign up */}
                                <TabsContent value='signup' className='space-y-4'>
                                    <form className='flex flex-col space-y-4' onSubmit={handleLoginSubmit}>
                                        <div className='relative'>
                                            <Input
                                                placeholder='Name'
                                                type='name'
                                                className='pl-10'
                                                {...registerSignup('name', {
                                                    required: {
                                                        value: true,
                                                        message: "Name is required"
                                                    }
                                                })}
                                            />
                                            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                        </div>
                                        {SignupError?.email && <p className='text-red-500 text-sm'>{SignupError.email.message}</p>}

                                        <div className='relative'>
                                            <Input
                                                placeholder='Email'
                                                type='email'
                                                className='pl-10'
                                                {...registerSignup('email', {
                                                    required: {
                                                        value: true,
                                                        message: "Email is required"
                                                    }
                                                })}
                                            />
                                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                        </div>
                                        {SignupError?.email && <p className='text-red-500 text-sm'>{SignupError.email.message}</p>}


                                        <div className='relative'>
                                            <Input
                                                placeholder='Password'
                                                type={showPassword ? 'text' : 'password'}
                                                className='pl-10'
                                                {...registerSignup('password', {
                                                    required: {
                                                        value: true,
                                                        message: "Password is required"
                                                    }
                                                })}
                                            />
                                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                            {showPassword ? (
                                                <EyeOff
                                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                                    onClick={() => setShowPassword(false)}
                                                    size={20}
                                                />
                                            ) : (
                                                <Eye
                                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                                    onClick={() => setShowPassword(true)}
                                                    size={20}
                                                />
                                            )}
                                        </div>
                                        {SignupError?.password && <p className='text-red-500 text-sm'>{SignupError.password.message}</p>}

                                        <div className='flex items-center '>
                                            <input type="checkbox" {...registerSignup('agreeTerms', {
                                                required: {
                                                    value: true,
                                                    message: "You must agree to the terms and conditions"
                                                }
                                            })} className='mr-2' />
                                            <label className='text-sm'>I agree to the terms and conditions</label>
                                        </div>
                                        {SignupError?.agreeTerms && <p className='text-red-500 text-sm'>{SignupError.agreeTerms.message}</p>}

                                        <Button type='submit' className='w-full'>{signupLoading ? (
                                            <>
                                                <Loader2 className='animate-spin mr-2 h-4 w-4' />


                                            </>
                                        ) : (
                                            <>
                                                Sign Up
                                            </>
                                        )}</Button>

                                    </form>
                                </TabsContent>

                                {/* forgot password */}
                                <TabsContent value='forgot' className='space-y-4'>
                                    {!forgotPasswordSuccess ? (
                                        <form className='flex flex-col space-y-4' onSubmit={handleForgotPasswordSubmit}>
                                            <div className='relative'>
                                                <Input
                                                    placeholder='Email'
                                                    type='email'
                                                    className='pl-10'
                                                    {...registerForgotPassword('email', {
                                                        required: {
                                                            value: true,
                                                            message: "Email is required"
                                                        }
                                                    })}
                                                />
                                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                            </div>
                                            {forgotPasswordError?.email && <p className='text-red-500 text-sm'>{forgotPasswordError.email.message}</p>}




                                            <div className='flex items-center '>
                                                <input type="checkbox" {...registerForgotPassword('agreeTerms', {
                                                    required: {
                                                        value: true,
                                                        message: "You must agree to the terms and conditions"
                                                    }
                                                })} className='mr-2' />
                                                <label className='text-sm'>I agree to the terms and conditions</label>
                                            </div>
                                            {forgotPasswordError?.agreeTerms && <p className='text-red-500 text-sm'>{forgotPasswordError.agreeTerms.message}</p>}

                                            <Button type='submit' className='w-full'>{forgotPasswordLoading ? (
                                                <>
                                                    <Loader2 className='animate-spin mr-2 h-4 w-4' />


                                                </>
                                            ) : (
                                                <>
                                                    Send Reset Link
                                                </>
                                            )}</Button>

                                        </form>

                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className='text-center space-y-4'
                                        >
                                            <CheckCircle className='w-16 h-16 text-green-500 mx-auto' />
                                            <h3 className='text-xl font-semibold text-gray-700'>
                                                Reset Link Sent
                                            </h3>

                                            <p className='text-gray-500'>
                                                We've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
                                            </p>

                                            <Button onClick={() => setForgotPasswordSuccess(false)} className='w-full'>
                                                Send Another Link To Email
                                            </Button>

                                        </motion.div>
                                    )}


                                </TabsContent>





                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                    <p className='text-sm text-center mt-4 text-gray-600'>
                        By Clicking "agree", you agree to our {" "}
                        <Link href='/terms-and-conditions' className='text-blue-500'>
                        Terms and Conditions
                        </Link>{" "}
                        and {""}
                        <Link href='/privacy-policy'
                        className='text-blue-500'>
                            Privacy Policy
                        </Link>
                    </p>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AuthPage

