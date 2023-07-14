'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoaderHook } from 'hooks/Hooks.Loader';
import { ToastHook } from 'hooks/Hooks.Toast';
import { ConfirmPasswordReset } from 'functions/AuthAlgorithms';
import TooltipDark from 'components/tooltip/TooltipDark';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import { InformationCircleIcon } from '@heroicons/react/solid';
import SetupContentHeader from 'components/label/SetupContentHeader';
import SetupHeaderDescription from 'components/label/SetupHeaderDescription';
import SetupHeaderLabel from 'components/label/SetupHeaderLabel';
import { Home_Link, Setup_Link } from 'routers/RouterLinks';
import SetupIconPasswordTextField from 'interfaces/Setup/Input/Setup.Input.IconPassword';

function UserMgmtResetPasswordScreen(props: UserMgmtResetPasswordScreenProps) {
  const [Password, setPassword] = useState('');
  const { setLoader } = LoaderHook();
  const { setToast } = ToastHook();
  const router = useRouter();

  // Validation
  const passwordExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const ValidatePassword =
    passwordExpression.test(Password) && Password.length > 7;

  const EmptyPassword = () => {
    setPassword('');
  };

  // Screen
  const MoveToHome = () => {
    setLoader(true);
    router.push(Home_Link);
  };
  const MoveToSetup = () => {
    setLoader(true);
    router.push(Setup_Link);
  };

  // Submit
  const PasswordSubmitClick = () => {
    if (ValidatePassword) {
      if (props.oobCode) {
        ConfirmPasswordReset({
          oobCode: props.oobCode.toString(),
          Password: Password,
          EmptyPassword: EmptyPassword,
          Loading: props.setLoading,
          Next: MoveToHome,
          ShowToast: (Title, Description, Type, Show) =>
            setToast({
              Title: Title,
              Description: Description,
              Type: Type,
              Show: Show,
            }),
        });
      } else {
        setToast({
          Title: 'Incorrect action code',
          Description: 'Action code may be undefined or emplty.',
          Type: 'Error',
          Show: true,
        });
      }
    } else {
      setToast({
        Title: 'Incorrect Password',
        Description: 'Please enter a valid Password.',
        Type: 'Error',
        Show: true,
      });
    }
  };

  return (
    <>
      <div className="p-14 ml-14 relative hidden md:flex w-full h-full justify-center items-center">
        <Image
          height={370}
          width={370}
          src="/vectors/login-register-otp-password.svg"
          alt="reset-password"
          className="text-white text-xs"
        />
      </div>
      <div className="md:p-9 space-y-5 relative w-full md:min-w-[400px] md-1000:min-w-[500px] flex flex-col items-center justify-center overflow-hidden">
        <SetupHeaderLabel ClassName="px-5 pt-5">
          Create a super memorable password
        </SetupHeaderLabel>
        <SetupHeaderDescription ClassName="px-5">
          Choose a password that&apos;s as unique as you are, but make sure
          it&apos;s a secret only you can unlock.
        </SetupHeaderDescription>
        <SetupContentHeader ClassName="px-5">Reset Password</SetupContentHeader>
        <m.div
          initial={props.Animation.Initial}
          animate={props.Animation.Final}
          transition={props.Animation.Transition}
          className={`${props.AnimationDivClassName} px-5 w-full relative overflow-hidden`}
        >
          <div
            className={`${props.ContentClassName} w-full flex flex-col space-y-4`}
          >
            <SetupIconPasswordTextField
              Value={Password}
              setValue={setPassword}
              ValidateValue={ValidatePassword}
              HandleSubmit={PasswordSubmitClick}
              Loading={props.Loading}
            />
            <div className="opacity-75 flex space-x-2 w-full">
              <TooltipDark
                arrow
                placement="top"
                title="Use a variety of characters, including uppercase and lowercase letters, numbers, and symbols. Make your password at least 8 characters long. Avoid using common words or phrases. Don't use personal information that can be easily guessed, such as your name, birthday, or address. Don't use the same password for multiple accounts."
              >
                <InformationCircleIcon className="h-5 text-white" />
              </TooltipDark>
              <h6 className="font-normal text-left w-full text-white text-sm">
                Your password should contain at least 8 or more characters with
                a mix of letters of uppercase and lowercase, numbers & symbols.
              </h6>
            </div>
            <div className="w-full flex justify-start">
              <SignInBackButton Label="Back" onClick={MoveToSetup} />
            </div>
          </div>
          <div className="flex w-full justify-end">
            <SetupSubmitButton
              Disabled={!ValidatePassword}
              onClick={PasswordSubmitClick}
            >
              Update Password
            </SetupSubmitButton>
          </div>
        </m.div>
      </div>
    </>
  );
}

export default UserMgmtResetPasswordScreen;