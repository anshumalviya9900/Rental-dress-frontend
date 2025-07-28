import {Route, Routes} from "react-router-dom";
import RoleSelector from "./components/RoleSelector";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import GoogleSignIn from "./components/GoogleSignIn";
import VerifyEmail from "./pages/VerifyEmail";
import SignIn from "./pages/SignIn";
import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";
import AddProductForm from "./components/AddProductForm";
import AllProducts from "./components/AllProducts";
import ManageCategory from "./components/ManageCategory";
import UserProductList from "./components/UserProductList";
import DonationForm from "./pages/DonationForm";
import DonationList from "./pages/DonationList";
import Product from "./pages/Product";
import PendingDonation from "./pages/PendingDonation";
import AdminLogout from "./pages/AdminLogout";
import UserLogout from "./pages/UserLogout";
import CartPage from "./pages/CartPage";
import WishList from "./pages/WishList";
import ProductsByCategory from "./pages/ProductByCategory";
import ContactUs from "./pages/ContactUs";
import SearchBar from "./pages/SearchBar";
import StoreLocations from "./pages/StoreLocations";
import AccountPage from "./pages/AccountPage";
import PayButton from "./pages/PayButton";
import ProfileForm from "./pages/UserForm";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile"
import OrderHistory from "./pages/OrderHistory";
import UserProfileForm from "./pages/UserForm";
import AllDonation from "./components/AllDonation";

 function App(){
 return <>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
         <Route path="/sign-in" element={<SignIn/>}/>
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
         <Route path="/admin/products" element={<AddProductForm/>}/>
         <Route path="/all-products" element={<AllProducts/>}/>
         <Route path="/admin/category" element={<ManageCategory/>}/>
          <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/google-signin" element={<GoogleSignIn/>} />
        <Route path="/user/home" element={<Home/>} />
         <Route path="/admin/sign-in" element={<AdminSignIn/>} />
         <Route path="/user/product-list" element={<UserProductList/>}/>
         <Route path="/:id" element={<Product/>}/>
         <Route path="/donation-form" element={<DonationForm/>}/>
         <Route path="/all-donation" element={<DonationList/>}/>
         <Route path="/pending-donation" element={<PendingDonation/>}/>
         <Route path="/admin-logout" element={<AdminLogout/>}/>
         <Route path="/user-logout" element={<UserLogout/>}/>
         <Route path="/user/cart" element={<CartPage/>}/>
         <Route path="/category/:categoryName" element={<ProductsByCategory/>}/>
         <Route path="/wishlist" element={<WishList/>}/>
         <Route path="/contact-us" element={<ContactUs/>}/>
         <Route path="/our-store" element={<StoreLocations/>}/>
         <Route path="/search" element={<SearchBar/>}/>
         <Route path="/my-account" element={<AccountPage/>}/>
         <Route path="/pay-button" element={<PayButton/>}/>
         <Route path="/profile-form" element={<UserProfileForm/>}/>
         <Route path="/my-profile" element={<MyProfile />}/>
         <Route path="/edit-profile" element={<EditProfile />}/>
         <Route path="/order-history" element={<OrderHistory />}/>
         <Route path="/alldonation" element={<AllDonation/>}/>
      </Routes>
  </>
}


export default App;
