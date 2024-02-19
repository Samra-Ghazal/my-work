import { lazy } from 'react';
import UpdatePassword from '../pages/UpdatePassword';
import Error404 from '../pages/Error404';
import Confirmation from '../pages/Confirmation';

// public
const Homepage = lazy(() => import('../pages/Homepage'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const FAQs = lazy(() => import('../pages/FAQs'));
const Glossary = lazy(() => import('../pages/Glossary'));
const Legal = lazy(() => import('../pages/Legal'));

// auth

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const AWSCognito = lazy(() => import('../components/AwsCognito'));
const Confimration = lazy(() => import('../pages/Confirmation'));

// user
const Portfolio = lazy(() => import('../pages/User/Portfolio'));
const UserStakes = lazy(() => import('../pages/User/Stake'));
const UserPools = lazy(() => import('../pages/User/Pools'));
const PoolEntryPage = lazy(() => import('../pages/User/PoolEntry'));
const Deposits = lazy(() => import('../pages/User/Deposit'));
const Withdraw = lazy(() => import('../pages/User/Withdraw'));
const Document = lazy(() => import('../pages/User/Document'));
const UserSettings = lazy(() => import('../pages/User/Settings'));
const News = lazy(() => import('../pages/User/News'));
const Transactions = lazy(() => import('../pages/User/Transactions'));
const Timeline = lazy(() => import('../pages/User/Timeline'));

// admin
const Dashboard = lazy(() => import('../pages/Admin/Dashboard'));
const Users = lazy(() => import('../pages/Admin/Users'));
const KYC = lazy(() => import('../pages/Admin/KYC'));
const Stakes = lazy(() => import('../pages/Admin/Stake'));
const Pools = lazy(() => import('../pages/Admin/Pools'));
const Banks = lazy(() => import('../pages/Admin/Banks'));
const Assets = lazy(() => import('../pages/Admin/Assets'));
const UserPortfolio = lazy(() => import('../pages/Admin/UserPortfolioPage'));
const Settings = lazy(() => import('../pages/Admin/Settings'));
const Fee = lazy(() => import('../pages/Admin/Fee'));
const TimeLine = lazy(() => import('../pages/Admin/TimeLine'));
const Blogs = lazy(() => import('../pages/Admin/Blogs'));
const Admins = lazy(() => import('../pages/Admin/Admins'));
const RollingReserves = lazy(() => import('../pages/Admin/RollingReserve'));
const Chains = lazy(() => import('../pages/Admin/Chains'));
const ChainsAccount = lazy(() => import('../pages/Admin/ChainsAccount'));
const UsdReservesProof = lazy(() => import('../pages/Admin/UsdReserves'));
//common
const Content = lazy(() => import('../pages/Admin/Content'));

export const PublicRoutesArr = [
  { url: 'home', component: Homepage },
  { url: 'contact-us', component: ContactUs },
  { url: 'faq', component: FAQs },
  { url: 'terms', component: Glossary },
  { url: 'privacy', component: Legal },
  { url: 'about-us', component: AboutUs }
];

export const AuthRoutesArr = [
  { url: 'home', component: Homepage },
  { url: 'login', component: Login },
  { url: 'register', component: Register },
  { url: 'aws-cognito', component: AWSCognito },
  { url: 'updatepassword', component: UpdatePassword },
  { url: 'confirmation', component: Confimration },
  { url: '404', component: Error404 }
];

export const UserRoutesArr = [
  { url: 'dashboard', component: Portfolio },
  { url: 'stakes', component: UserStakes },
  { url: 'pools', component: UserPools },
  { url: 'deposit', component: Deposits },
  { url: 'withdraw', component: Withdraw },
  { url: 'poolentry', component: PoolEntryPage },
  { url: 'help', component: Document },
  { url: 'profile/*', component: UserSettings },
  { url: 'news', component: News },
  { url: 'news/:id', component: Content },
  { url: 'transactions', component: Transactions },
  { url: 'timeline', component: Timeline },
  { url: 'confirmation', component: Confirmation }
];

export const CommonRoutes = [
  { url: 'dashboard', component: Dashboard },
  { url: 'users', component: Users },
  { url: 'kyc', component: KYC },
  { url: 'stakes', component: Stakes },
  { url: 'pools', component: Pools },
  { url: 'banks', component: Banks },
  { url: 'assets', component: Assets },
  { url: 'users/:id', component: UserPortfolio },
  { url: 'profile/settings', component: Settings }
];

export const BrokerRoutesArr = CommonRoutes;
export const SeniorBrokerRoutesArr = [
  ...CommonRoutes,
  { url: 'timeline', component: TimeLine },
  { url: 'fees', component: Fee }
];

export const AdminRoutesArr = [
  ...CommonRoutes,
  { url: 'timeline', component: TimeLine },
  { url: 'blogs', component: Blogs },
  { url: 'blogs/:id', component: Content },
  { url: 'rolling-reserve', component: RollingReserves },
  { url: 'chains', component: Chains },
  { url: 'chains/chainsAccount/:id', component: ChainsAccount },
  { url: 'usdReservesBalance', component: UsdReservesProof }
];

export const AdminBrokerRoutes = {
  broker: BrokerRoutesArr,
  seniorBroker: SeniorBrokerRoutesArr,
  admin: AdminRoutesArr
};
