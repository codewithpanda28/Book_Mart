import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import Image from 'next/image'
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
                                        <Image
                                            src='/icons/google.svg'
                                            alt='google'
                                            width={20}
                                            height={20}
                                        />
                                        Login with Google
                                    </Button>
                                </TabsContent>


                                <TabsContent value='signup'>
                                    <form onSubmit={handleSignupSubmit} className='space-y-4'>
                                        <div className='relative'>
                                            <Input
                                                placeholder='Name'
                                                type='text'
                                                className='pl-10'
                                                {...registerSignup('name', {
                                                    required: {
                                                        value: true,
                                                        message: "Name is required"
                                                    }
                                                })}
                                            />
                                        </div>
                                        {SignupError?.name && <p className='text-red-500 text-sm'>{SignupError.name.message}</p>}
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
                                        </div>
                                        {SignupError?.password && <p className='text-red-500 text-sm'>{SignupError.password.message}</p>}
                                        <div className='relative'>
                                            <Input
                                                placeholder='Confirm Password'
                                                type={showPassword ? 'text' : 'password'}
                                                className='pl-10'
                                                {...registerSignup('confirmPassword', {
                                                    required: {
                                                        value: true,
                                                        message: "Confirm Password is required"
                                                    },
                                                    validate: (value) =>
                                                        value === registerSignup('password').value || "Passwords do not match"
                                                })}
                                            />
                                        </div>
                                        {SignupError?.confirmPassword && <p className='text-red-500 text-sm'>{SignupError.confirmPassword.message}</p>}
                                        <div className='flex justify-between items-center'>
                                            <Checkbox
                                                id='terms'
                                                name='terms'
                                                {...registerSignup('agreeTerms', {
                                                    required: {
                                                        value: true,
                                                        message: "You must agree to the terms and conditions"
                                                    }
                                                })}
                                            />
                                            <label htmlFor='terms' className='text-sm text-muted-foreground cursor-pointer select-none'>
                                                I agree to the terms and conditions
                                            </label>
                                        </div>
                                        {SignupError?.agreeTerms && <p className='text-red-500 text-sm'>{SignupError.agreeTerms.message}</p>}
                                        <Button type='submit' className='w-full flex items-center justify-center gap-2
                                            bg-blue-500 text-white rounded-md py-2 px-4 mt-4'>
                                            {signupLoading ? (
                                                <Loader2 className='animate-spin mr-2 h-4 w-4' />
                                            ) : (
                                                "Signup"
                                            )}
                                        </Button>
                                    </form>
                                </TabsContent>

                                

                                

                                
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AuthPage

