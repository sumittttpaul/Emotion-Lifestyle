import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { AuthErrorType, AuthType } from './AuthType';
import { useAuth } from '../../../firebase/useAuth';
import { IsInformationHandler } from './IsInformationHandler';
import { IUserProfile } from '../../../mongodb/schema/Schema.UserProfile';
import { LoginPhoneAuthUIProps } from './Login/Login.PhoneAuthUI';
import { LoginEmailAuthUIProps } from './Login/Login.EmailAuthUI';
import { LoginOtherAccountAuthUIProps } from './Login/Login.OtherAccountAuthUI';
import { LoginOTPAuthUIProps } from './Login/Login.OTPAuthUI';
import { LoginPasswordAuthUIProps } from './Login/Login.PasswordAuthUI';
import { LoginForgotPasswordAuthUIProps } from './Login/Login.ForgotPasswordAuthUI';
import { RegisterNameAuthUIProps } from './Register/Register.NameAuthUI';
import { RegisterPhoneAuthUIProps } from './Register/Register.PhoneAuthUI';
import { RegisterOTPAuthUIProps } from './Register/Register.OTPAuthUI';
import { RegisterEmailAuthUIProps } from './Register/Register.EmailAuthUI';
import { RegisterPasswordAuthUIProps } from './Register/Register.PasswordAuthUI';
import { RegisterVerifyEmailAuthUIProps } from './Register/Register.VerifyEmailAuthUI';
import { RegisterProfilePictureAuthUIProps } from './Register/Register.ProfilePictureAuthUI';
import { RegisterBirthdayAuthUIProps } from './Register/Register.BirthdayAuthUI';
import { RegisterGenderAuthUIProps } from './Register/Register.GenderAuthUI';
import {
  getUserProfile,
  _userProfileEndURL as cacheKey,
} from '../../../mongodb/helper/Helper.UserProfile';
import AuthBodyContainer from '../../container/Auth/AuthBodyContainer';
import AuthContentContainer from '../../container/Auth/AuthContentContainer';
import { DecryptData } from '../../../algorithms/security/CryptionSecurity';
import { UserProfileEncrytionKey } from '../../../algorithms/security/CryptionKey';
import { FirebaseAuth } from '../../../firebase/clientApp';

// Dynamic Imports
const LoginPhoneAuthUI = dynamic<LoginPhoneAuthUIProps>(
  () => import('./Login/Login.PhoneAuthUI').then((x) => x.LoginPhoneAuthUI),
  { ssr: false }
);

const LoginEmailAuthUI = dynamic<LoginEmailAuthUIProps>(
  () => import('./Login/Login.EmailAuthUI').then((x) => x.LoginEmailAuthUI),
  { ssr: false }
);

const LoginOtherAccountAuthUI = dynamic<LoginOtherAccountAuthUIProps>(
  () =>
    import('./Login/Login.OtherAccountAuthUI').then(
      (x) => x.LoginOtherAccountAuthUI
    ),
  { ssr: false }
);

const LoginOTPAuthUI = dynamic<LoginOTPAuthUIProps>(
  () => import('./Login/Login.OTPAuthUI').then((x) => x.LoginOTPAuthUI),
  { ssr: false }
);

const LoginPasswordAuthUI = dynamic<LoginPasswordAuthUIProps>(
  () =>
    import('./Login/Login.PasswordAuthUI').then((x) => x.LoginPasswordAuthUI),
  { ssr: false }
);

const LoginForgotPasswordAuthUI = dynamic<LoginForgotPasswordAuthUIProps>(
  () =>
    import('./Login/Login.ForgotPasswordAuthUI').then(
      (x) => x.LoginForgotPasswordAuthUI
    ),
  { ssr: false }
);

const RegisterNameAuthUI = dynamic<RegisterNameAuthUIProps>(
  () =>
    import('./Register/Register.NameAuthUI').then((x) => x.RegisterNameAuthUI),
  { ssr: false }
);

const RegisterPhoneAuthUI = dynamic<RegisterPhoneAuthUIProps>(
  () =>
    import('./Register/Register.PhoneAuthUI').then(
      (x) => x.RegisterPhoneAuthUI
    ),
  { ssr: false }
);

const RegisterOTPAuthUI = dynamic<RegisterOTPAuthUIProps>(
  () =>
    import('./Register/Register.OTPAuthUI').then((x) => x.RegisterOTPAuthUI),
  { ssr: false }
);

const RegisterEmailAuthUI = dynamic<RegisterEmailAuthUIProps>(
  () =>
    import('./Register/Register.EmailAuthUI').then(
      (x) => x.RegisterEmailAuthUI
    ),
  { ssr: false }
);

const RegisterPasswordAuthUI = dynamic<RegisterPasswordAuthUIProps>(
  () =>
    import('./Register/Register.PasswordAuthUI').then(
      (x) => x.RegisterPasswordAuthUI
    ),
  { ssr: false }
);

const RegisterVerifyEmailAuthUI = dynamic<RegisterVerifyEmailAuthUIProps>(
  () =>
    import('./Register/Register.VerifyEmailAuthUI').then(
      (x) => x.RegisterVerifyEmailAuthUI
    ),
  { ssr: false }
);

const RegisterProfilePictureAuthUI = dynamic<RegisterProfilePictureAuthUIProps>(
  () =>
    import('./Register/Register.ProfilePictureAuthUI').then(
      (x) => x.RegisterProfilePictureAuthUI
    ),
  { ssr: false }
);

const RegisterBirthdayAuthUI = dynamic<RegisterBirthdayAuthUIProps>(
  () =>
    import('./Register/Register.BirthdayAuthUI').then(
      (x) => x.RegisterBirthdayAuthUI
    ),
  { ssr: false }
);

const RegisterGenderAuthUI = dynamic<RegisterGenderAuthUIProps>(
  () =>
    import('./Register/Register.GenderAuthUI').then(
      (x) => x.RegisterGenderAuthUI
    ),
  { ssr: false }
);

/**
 * @author
 * @function @SetupUI
 **/

export const SetupUI: FC = () => {
  const { FirebaseUser, FirebaseLoading } = useAuth();
  const [InitialSlide, setInitialSlide] = useState(0);
  const [SkipDialog, setSkipDialog] = useState(false);
  const [Finish, setFinish] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Toast, setToast] = useState(false);
  const [InitialLoading, setInitialLoading] = useState(true); // true
  const [InformationCheckLoading, setInformationCheckLoading] = useState(true); // true
  const [Error, setError] = useState<AuthErrorType>({
    show: false,
    type: undefined, // undefined
  });
  const [ToastSetting, setToastSetting] = useState({
    Title: '',
    Description: '',
    Type: '',
  });
  const [Screen, setScreen] = useState<AuthType>(null); // null

  const { isLoading, data } = useQuery(
    [cacheKey, FirebaseUser?.uid],
    () => getUserProfile(FirebaseUser?.uid),
    { staleTime: Infinity }
  );
  const userProfile = data as IUserProfile;

  // Extra State
  const [FullName, setFullName] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Gender, setGender] = useState('');
  const [ResetCaptcha, setResetCaptcha] = useState(false);
  const [isEmailVerified, setisEmailVerified] = useState<boolean | undefined>(
    undefined
  );

  const SkipDialogClose = () => setSkipDialog(false);

  const ShowToast = (
    title: string,
    desccription: string,
    type: string,
    show: boolean
  ) => {
    setToast(show);
    setToastSetting({
      Title: title,
      Description: desccription,
      Type: type,
    });
  };

  const handleIsInformationContent = (Screen: AuthType) => {
    setInitialSlide(0);
    setScreen(Screen);
    setLoading(false);
    setInformationCheckLoading(false);
  };

  const handleIsformationProps = {
    FirebaseUser: FirebaseUser,
    userProfile: userProfile,
    FirebaseLoading: FirebaseLoading,
    isuserProfileLoading: isLoading,
    handleIsInformationContent: handleIsInformationContent,
    setInitialSlide: setInitialSlide,
    setScreen: setScreen,
    setFinish: setFinish,
    setLoading: setLoading,
    setError: setError,
    setInformationCheckLoading: setInformationCheckLoading,
    ShowToast: ShowToast,
  };

  const IsInformation_AfterLogin = (Screen: AuthType) => {
    handleIsInformationContent(Screen);
  };

  const IsInformation_InitialLoad = (ScreenState: 'initial' | 'normal') => {
    IsInformationHandler({
      AfterScreen: 'initial-load',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterName = (ScreenState: 'initial' | 'normal') => {
    IsInformationHandler({
      AfterScreen: 'after-name',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterPhoneAndOTP = (
    ScreenState: 'initial' | 'normal'
  ) => {
    IsInformationHandler({
      AfterScreen: 'after-phone',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterEmailAndPassword = (
    ScreenState: 'initial' | 'normal'
  ) => {
    IsInformationHandler({
      AfterScreen: 'after-email',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterVerifyEmail = (
    ScreenState: 'initial' | 'normal'
  ) => {
    IsInformationHandler({
      AfterScreen: 'after-verify-email',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterProfilePhoto = (
    ScreenState: 'initial' | 'normal'
  ) => {
    IsInformationHandler({
      AfterScreen: 'after-profile-picture',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterBirthday = (ScreenState: 'initial' | 'normal') => {
    IsInformationHandler({
      AfterScreen: 'after-date-of-birth',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  const IsInformation_AfterGender = (ScreenState: 'initial' | 'normal') => {
    IsInformationHandler({
      AfterScreen: 'after-gender',
      ScreenState: ScreenState,
      ...handleIsformationProps,
    });
  };

  useEffect(() => {
    if (InitialLoading && !FirebaseLoading && !isLoading)
      setInitialLoading(false);
  }, [InitialLoading, FirebaseLoading, isLoading]);

  useEffect(() => {
    if (InitialLoading) return;
    if (FirebaseUser) {
      IsInformation_InitialLoad('initial');
    } else {
      handleIsInformationContent('login-phone');
    }
  }, [InitialLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      if (FirebaseUser) {
        if (userProfile._data.fullName) {
          const UserFullName = DecryptData(
            UserProfileEncrytionKey(FirebaseUser.uid, 'FullName'),
            userProfile._data.fullName
          );
          setFullName(UserFullName ? UserFullName : '');
        }
        if (userProfile._data.emailAddress) {
          const UserEmailAddress = DecryptData(
            UserProfileEncrytionKey(FirebaseUser.uid, 'EmailAddress'),
            userProfile._data.emailAddress
          );
          setEmailAddress(UserEmailAddress ? UserEmailAddress : '');
        }
        if (userProfile._data.phoneNumber) {
          const UserPhoneNumber = DecryptData(
            UserProfileEncrytionKey(FirebaseUser.uid, 'PhoneNumber'),
            userProfile._data.phoneNumber
          );
          setPhoneNumber(UserPhoneNumber ? UserPhoneNumber : '');
        }
        if (userProfile._data.dateOfBirth) {
          const UserDateOfBirth = DecryptData(
            UserProfileEncrytionKey(FirebaseUser.uid, 'DateOfBirth'),
            userProfile._data.dateOfBirth
          );
          setDateOfBirth(UserDateOfBirth ? UserDateOfBirth : '');
        }
        if (userProfile._data.gender) {
          const UserGender = DecryptData(
            UserProfileEncrytionKey(FirebaseUser.uid, 'Gender'),
            userProfile._data.gender
          );
          setGender(UserGender ? UserGender : '');
        }
      }
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!FirebaseAuth) return;
    return FirebaseAuth.onIdTokenChanged(async (user) => {
      if (!user) return;
      if (user.emailVerified) setisEmailVerified(true);
    });
  }, []);

  // Class
  const BodyClassName = 'h-full md:h-[652px]';
  const ContainerClassName = 'h-[350px]';
  const ContentClassName = 'h-[300px]';

  // Animation
  const Animation = {
    Initial: { x: 50, opacity: 0 },
    Final: { x: 0, opacity: 1 },
    Transition: { type: 'tween' },
  };

  return (
    <AuthBodyContainer
      ClassName={BodyClassName}
      Animation={Animation}
      InitialSlide={InitialSlide}
      SkipDialogOpen={SkipDialog}
      SkipDialogClose={SkipDialogClose}
      Finish={Finish}
      Error={Error}
      Loading={Loading}
      AuthScreen={Screen}
      ShowToast={Toast}
      setAuthScreen={setScreen}
      ToastSetting={ToastSetting}
      setLoading={setLoading}
      setToast={setToast}
      setToastSetting={setToastSetting}
      setError={setError}
      InformationCheckLoading={InformationCheckLoading}
      Toast={{
        Open: Toast,
        onClose: setToast,
        MessageTitle: ToastSetting.Title,
        MessageDescription: ToastSetting.Description,
        Type: ToastSetting.Type,
      }}
    >
      <AuthContentContainer
        ClassName={ContainerClassName}
        Animation={Animation}
        AuthScreen={Screen}
      >
        <AnimatePresence mode="wait" initial={true}>
          {Screen === 'login-phone' && (
            <LoginPhoneAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              PhoneNumber={PhoneNumber}
              setPhoneNumber={setPhoneNumber}
              ResetCaptcha={ResetCaptcha}
              setResetCaptcha={setResetCaptcha}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'login-email' && (
            <LoginEmailAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              EmailAddress={EmailAddress}
              setEmailAddress={setEmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'login-others' && (
            <LoginOtherAccountAuthUI
              Animation={Animation}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setToast={setToast}
              setLoading={setLoading}
              setError={setError}
              setToastSetting={setToastSetting}
              IsInformation={IsInformation_AfterLogin}
            />
          )}
          {Screen === 'login-otp' && (
            <LoginOTPAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              PhoneNumber={PhoneNumber}
              Toast={Toast}
              Loading={Loading}
              setError={setError}
              setResetCaptcha={setResetCaptcha}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={IsInformation_AfterLogin}
            />
          )}
          {Screen === 'login-password' && (
            <LoginPasswordAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              EmailAddress={EmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'login-forgot-password' && (
            <LoginForgotPasswordAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              EmailAddress={EmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
            />
          )}
          {Screen === 'register-name' && (
            <RegisterNameAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              FullName={FullName}
              setFullName={setFullName}
              IsInformation={() => IsInformation_AfterName('normal')}
            />
          )}
          {Screen === 'register-phone' && (
            <RegisterPhoneAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              PhoneNumber={PhoneNumber}
              setPhoneNumber={setPhoneNumber}
              ResetCaptcha={ResetCaptcha}
              setResetCaptcha={setResetCaptcha}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={() => IsInformation_AfterPhoneAndOTP('normal')}
            />
          )}
          {Screen === 'register-otp' && (
            <RegisterOTPAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              PhoneNumber={PhoneNumber}
              Toast={Toast}
              Loading={Loading}
              setResetCaptcha={setResetCaptcha}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={() => IsInformation_AfterPhoneAndOTP('normal')}
            />
          )}
          {Screen === 'register-email' && (
            <RegisterEmailAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              setSkipDialog={setSkipDialog}
              EmailAddress={EmailAddress}
              setEmailAddress={setEmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={() =>
                IsInformation_AfterEmailAndPassword('normal')
              }
            />
          )}
          {Screen === 'register-password' && (
            <RegisterPasswordAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              EmailAddress={EmailAddress}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={() =>
                IsInformation_AfterEmailAndPassword('normal')
              }
            />
          )}
          {Screen === 'register-verify-email' && (
            <RegisterVerifyEmailAuthUI
              isEmailVerified={isEmailVerified}
              ClassName={ContentClassName}
              Animation={Animation}
              Toast={Toast}
              Loading={Loading}
              setAuthScreen={setScreen}
              setLoading={setLoading}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={() => IsInformation_AfterVerifyEmail('normal')}
            />
          )}
          {Screen === 'register-profile-picture' && (
            <RegisterProfilePictureAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              setAuthScreen={setScreen}
              setToast={setToast}
              setToastSetting={setToastSetting}
              IsInformation={() => IsInformation_AfterProfilePhoto('normal')}
            />
          )}
          {Screen === 'register-date-of-birth' && (
            <RegisterBirthdayAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              setLoading={setLoading}
              setAuthScreen={setScreen}
              setToast={setToast}
              setToastSetting={setToastSetting}
              DateOfBirth={DateOfBirth}
              setDateOfBirth={setDateOfBirth}
              IsInformation={() => IsInformation_AfterBirthday('normal')}
            />
          )}
          {Screen === 'register-gender' && (
            <RegisterGenderAuthUI
              ClassName={ContentClassName}
              Animation={Animation}
              setSkipDialog={setSkipDialog}
              Toast={Toast}
              setFinish={setFinish}
              setLoading={setLoading}
              setAuthScreen={setScreen}
              setToast={setToast}
              setToastSetting={setToastSetting}
              Gender={Gender}
              setGender={setGender}
              IsInformation={() => IsInformation_AfterGender('normal')}
            />
          )}
        </AnimatePresence>
      </AuthContentContainer>
    </AuthBodyContainer>
  );
};
