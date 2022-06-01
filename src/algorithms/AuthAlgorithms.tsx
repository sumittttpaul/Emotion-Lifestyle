import firebase from 'firebase/compat/app';
import {
  ResendOTPProps,
  VerifyOTPProps,
  SignInWithPhoneNumberProps,
  SignInWithEmailAndPasswordProps,
  SignInWithFacebookProps,
  SignInWithGoogleProps,
  SignInWithAppleProps,
  SignUpProps,
} from './AuthProps';
import 'firebase/compat/auth';
import { AuthError } from '../firebase/AuthError';
import Router from 'next/router';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}
var grecaptcha: any;

// Captcha

export const configureCaptcha = () => {
  if (typeof window === 'object') {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'verify-sign-in-recaptcha',
      {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          console.log('Recaptca Verified');
        },
        'expired-callback': () => {
          // token expire
        },
        defaultCountry: 'IN',
      }
    );
  }
};

// OTP

export const ResentOTP = ({
  Phone,
  Loading,
  ToastMessage,
  ToastType,
  ToastShow,
}: ResendOTPProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  Loading(true);
  window.recaptchaVerifier.render().then(function (widgetId: any) {
    grecaptcha.reset(widgetId);
  });
  const number = '+91' + Phone;
  const appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(number, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      Loading(false);
      Toast('OTP sent successfully', 'Success', true);
      console.log('Otp has been sent to ' + number);
    })
    .catch((error) => {
      Loading(false);
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      console.error('Otp not sent beacuse' + error.code);
    });
};

export const VerifyOTP = ({
  Phone,
  OTP,
  Loading,
  ToastMessage,
  ToastType,
  ToastShow,
}: VerifyOTPProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  Loading(true);
  const code = OTP.toString();
  var credential = firebase.auth.PhoneAuthProvider.credential(
    window.confirmationResult.verificationId,
    code
  );
  firebase
    .auth()
    .signInWithCredential(credential)
    .then((result: any) => {
      console.log('user is verified and SignIn');
      const IsNewUser = result.additionalUserInfo.isNewUser;
      if (IsNewUser) {
        if (firebase.auth().currentUser) {
          const UID = firebase.auth().currentUser?.uid;
          Router.push({
            pathname: '/auth/register',
            query: { id: `${UID}`, phone: `${Phone}` },
          });
        }
      } else {
        Router.push('/');
      }
    })
    .catch((error) => {
      Loading(false);
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      console.error('OTP verification failed beacuse ' + error.code);
    });
};

// SignIn

export const SignInWithPhoneNumber = ({
  Phone,
  EmptyPhone,
  ToastShow,
  ToastMessage,
  ToastType,
  ShowOTPDialog,
  Loading,
}: SignInWithPhoneNumberProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  Loading(true);
  configureCaptcha();
  const number = '+91' + Phone;
  const appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(number, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      Loading(false);
      Toast('OTP sent successfully', 'Success', true);
      console.log('OTP sent to ' + number);
      ShowOTPDialog();
    })
    .catch((error) => {
      Loading(false);
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      EmptyPhone();
      console.error('OTP not sent beacuse' + error.code);
    });
};

export const SignInWithEmailAndPassword = ({
  Email,
  Password,
  EmptyPasswordTextField,
  ToastMessage,
  ToastType,
  ToastShow,
  Loading,
}: SignInWithEmailAndPasswordProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  Loading(true);
  firebase
    .auth()
    .signInWithEmailAndPassword(Email, Password)
    .then(() => {
      Router.push('/');
      console.error('SingIn with Email & Password Successful !');
    })
    .catch((error) => {
      Loading(false);
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      EmptyPasswordTextField();
      console.error(
        'SingIn with Email & Password Failed because ' + error.code
      );
    });
};

export const SignInWithFacebook = ({
  ToastMessage,
  ToastType,
  ToastShow,
}: SignInWithFacebookProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
      Router.push('/');
      console.log('SignIn with Facebook Successful !');
    })
    .catch((error) => {
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      console.error('Failed to SignIn with Facebook because ' + error.code);
    });
};

export const SignInWithGoogle = ({
  ToastMessage,
  ToastType,
  ToastShow,
}: SignInWithGoogleProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      Router.push('/');
      console.log('SignIn with Google Successful !');
    })
    .catch((error) => {
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      console.error('Failed to SignIn with Google because ' + error.code);
    });
};

export const SignInWithApple = ({
  ToastMessage,
  ToastType,
  ToastShow,
}: SignInWithAppleProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  const appleProvider = new firebase.auth.OAuthProvider('apple.com');
  firebase
    .auth()
    .signInWithPopup(appleProvider)
    .then((result) => {
      Router.push('/');
      console.log('SignIn with Apple Successful !');
    })
    .catch((error) => {
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      console.error('Failed to SignIn with Apple because ' + error.code);
    });
};

// Sign Up

export const SignUp = ({
  FirstName,
  LastName,
  Email,
  Password,
  EmptyPasswordTextField,
  Loading,
  ToastMessage,
  ToastShow,
  ToastType,
}: SignUpProps) => {
  const Toast = (message: string, type: string, show: boolean) => {
    ToastMessage(message);
    ToastType(type);
    ToastShow(show);
  };
  Loading(true);
  const user = firebase.auth().currentUser;
  user
    ?.updateProfile({
      displayName: FirstName + ' ' + LastName,
    })
    .then(() => {
      console.log('Name updated');
      var credential = firebase.auth.EmailAuthProvider.credential(
        Email,
        Password
      );
      user
        ?.linkWithCredential(credential)
        .then(() => {
          console.log('Linking account successfully');
          const { phone } = Router.query;
          if (firebase.auth().currentUser) {
            const UID = firebase.auth().currentUser?.uid;
            Router.push({
              pathname: '/auth/register/setup-account',
              query: {
                id: `${UID}`,
                firstname: `${FirstName}`,
                lastname: `${LastName}`,
                email: `${Email}`,
                phone: `${phone}`,
              },
            });
          }
        })
        .catch((error) => {
          Loading(false);
          EmptyPasswordTextField();
          const message = AuthError(error.code);
          Toast(`${message}`, 'Error', true);
          console.error('Failed to Link account because ' + error.code);
        });
    })
    .catch((error) => {
      Loading(false);
      EmptyPasswordTextField();
      const message = AuthError(error.code);
      Toast(`${message}`, 'Error', true);
      console.error('Name not updated because ' + error.code);
    });
};