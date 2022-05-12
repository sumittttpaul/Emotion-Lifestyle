import React, { FC } from 'react';
import Image from 'next/image';
import AuthContainer from '../container/AuthContainer';
import { Tab } from '@headlessui/react';
import { DeviceMobileIcon, MailIcon } from '@heroicons/react/solid';
import EmailAuthUI from './AuthComponentUI/EmailAuthUI';
import PhoneAuthUI from './AuthComponentUI/PhoneAuthUI';
import { Link } from '@mui/material';
import Router from 'next/router';

interface IProps {
  setOTP: (arg: boolean) => void;
}

/**
 * @author
 * @function @LoginUI
 **/

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const LoginUI: FC<IProps> = (props) => {
  const [value, setValue] = React.useState(true);

  const handlePhoneClick = () => {
    setValue(true);
  };

  const handleEmailClick = () => {
    setValue(false);
  };

  return (
    <AuthContainer>
      <div className="w-full max-w-[350px] space-y-7 flex flex-col justify-center items-center">
        <Image
          height={50}
          width={50}
          className="opacity-70"
          src="/agewear.svg"
          alt="logo-svg"
        />
        <h6 className="font-medium text-center text-md">
          Sign in with an Agewear Account
        </h6>
        <div className="w-full">
          <Tab.Group>
            <Tab.List className="flex space-x-2 rounded-md bg-[#121212] p-[5px]">
              <Tab
                onClick={handlePhoneClick}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-md py-4 text-[13px] text-white focus:outline-none',
                    selected ? 'bg-[#202020]' : 'text-white/[0.50]'
                  )
                }
              >
                <div className="flex w-full justify-center space-x-1">
                  <DeviceMobileIcon height={20} width={20} />
                  <h6>Phone</h6>
                </div>
              </Tab>
              <Tab
                onClick={handleEmailClick}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-md py-4 text-[13px] text-white focus:outline-none',
                    selected ? 'bg-[#202020]' : 'text-white/[0.50]'
                  )
                }
              >
                <div className="flex w-full justify-center space-x-2">
                  <MailIcon height={20} width={20} />
                  <h6>Email</h6>
                </div>
              </Tab>
            </Tab.List>
          </Tab.Group>
        </div>
        {value ? <PhoneAuthUI setOTP={props.setOTP} /> : <EmailAuthUI />}
        <div className="flex">
          <h6 className="text-xs font-light text-[rgba(255,255,255,0.75)] flex items-center">
            Don&apos;t have an Agewear account?&#160;
            <Link
              onClick={() => {
                Router.push('/authentication/register');
              }}
              className="text-white text-xs"
              component="button"
              underline="always"
            >
              Sign Up
            </Link>
          </h6>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginUI;
