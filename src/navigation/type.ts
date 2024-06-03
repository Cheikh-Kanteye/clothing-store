import { ImageSourcePropType } from "react-native";

export type AuthStackParamList = {
  Onboarding: undefined;
  GetStarted: undefined;
  Signin: undefined;
  Signup: undefined;
  CompleteProfile: { email: string; password: string };
};

export type TabParamList = {
  Home: undefined;
  Orders: undefined;
  WishList: undefined;
  ChatList: undefined;
  Profile: undefined;
};

export type PrivateStackParamList = {
  Tab: undefined;
  ProductDetails: undefined;
  Checkout: undefined;
  ShippingAddress: undefined;
  ChooseShipping: undefined;
  PaymentMethod: undefined;
  AddCard: undefined;
  PaymentSuccess: undefined;
  Coupon: undefined;
  Search: undefined;
  filter: undefined;
  OrderReview: undefined;
  TrackOrder: undefined;
  Category: undefined;
  Chat: undefined;
  Notification: undefined;
  Settings: undefined;
  PasswordManager: undefined;
  HelpCenter: undefined;
  PrivacyPolicy: undefined;
  InviteFriends: undefined;
};

export type categorie = {
  id: number;
  icon: ImageSourcePropType;
  label: string;
};

export type slide = {
  id: number;
  label: string;
  message: string;
  img: ImageSourcePropType;
};

export type Timer = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
