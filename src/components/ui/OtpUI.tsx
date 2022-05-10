import { Link } from "@mui/material";
import OTPTextFieldDark from "../textfield/OTPTextFieldDark";
import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useState } from 'react'

const OtpUI:FC<{setShow:boolean, setHide: (arg: boolean) => void}> = ({setShow, setHide}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    function closeModal() {
        setIsOpen(false);
        setHide(isOpen);
    }

    useEffect(() => {
        setIsOpen(setShow);
    },[setShow])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="transform overflow-hidden rounded-lg bg-[#202020] text-left align-middle shadow-xl transition-all">
                            <div className="flex flex-col px-14 py-12 space-y-7 justify-center items-center">
                                <h6 className='text-white font-medium text-center text-md'>OTP Verification</h6>
                                <div className="space-x-8 flex justify-center items-center">
                                    <div className='space-x-2 flex justify-center items-center'>
                                        <OTPTextFieldDark/>
                                        <OTPTextFieldDark/>
                                        <OTPTextFieldDark/>
                                    </div>
                                    <div className='space-x-2 flex justify-center items-center'>
                                        <OTPTextFieldDark/>
                                        <OTPTextFieldDark/>
                                        <OTPTextFieldDark/>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <h6 className='text-white text-[14px] font-light opacity-75'>Otp not send?&#160;</h6>
                                    <Link href="#" className='text-white text-[14px]' component="button" underline="always">resend OTP</Link>
                                </div>
                            </div> 
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default OtpUI;