import React from 'react';
import logo from './logo.svg';
import { useState, useRef, useEffect, useContext } from 'react';
import './Sparkles.css';
import { Link, Routes, Route } from 'react-router-dom';

import Home from './Home';

import Account from './Account';
import ProductPage from './ProductPage';
import { CartContext } from './Context';
//Want big night, synthy, future club vibes. Dark
import ne from './assets/Neon Underground.wav';
import CartElement from './Cart';
import Checkout from './Checkout';
//do a cool gradient thing 
//clicking on logo will act as home button


//the billboard rotates every so often
//text courtesy of gpt4
const scroll_advertisements_dict: { [key: number]: string } = {
  0: 'Experience Life 2.0 with VirtuReal™: Bored of your humdrum existence? Experience life like never before in our immersive digital utopia. VirtuReal™ brings you the future of entertainment. Dive into a world of infinite possibilities, where reality is what you make it. With VirtuReal™, you are the architect of your own universe. Experience a vast array of digital landscapes, engage in extraordinary activities, and make unforgettable memories. Start your adventure today! VirtuReal™ - Your alternate reality awaits!',
  1: "Stay Ahead with Neurolink's Brain Enhancement Chips: Are you always a step behind? Can't keep up with the information age? Upgrade your mind with Neurolink's revolutionary brain enhancement chips. Boost memory, speed up learning, and access the net directly with your thoughts. Don't just survive the future - master it. Imagine a world where complex calculations take no more time than a thought, where every language is at your fingertips, where you can explore the depths of the digital universe with just a thought. Upgrade yourself with Neurolink and stay ahead.",
  2: "Elysium Skycars - Redefine Your Horizon: Tired of gridlock? Take to the skies with Elysium Skycars. Our cutting-edge vehicles combine luxury, speed, and effortless vertical takeoff. Cruise above the cityscape in style and experience the thrill of personal flight. Elysium Skycars - Redefine your horizon. Immerse yourself in a revolutionary travel experience - silence the noise of the city, glide through the clouds, and reach your destination in record time. Feel the thrill of freedom as you soar above it all with Elysium Skycars.",
  3: "KRONOS Tech - Control Time. Control Life: Introducing KRONOS Tech's latest innovation in personal time management. Our patented Chrono-Adjuster wrist device lets you manipulate your perception of time. Need more time for a project? Or want to fast forward through a boring meeting? Now you can. With KRONOS Tech, control time, control life. Imagine enjoying more moments of relaxation, achieving greater productivity, and taking control of your life in ways you never thought possible. The power to shape your experience of time is now within your reach. With KRONOS Tech, time is truly in your hands."
}

const ReallyCoolScrollingText = () => {
  const [ad, setAd] = useState<string>("");

  function getRandomInt() {
    return Math.floor(Math.random() * 4);
  }

  useEffect(() => {
    console.log("useEffect called");
    //Set initial advertisement
    setAd(scroll_advertisements_dict[getRandomInt()]);

    //Set interval to change advertisement every minute
    const intervalId = setInterval(() => {
      setAd(scroll_advertisements_dict[getRandomInt()]);
    }, 60000);

    //Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (

    <div className='overflow-hidden w-full mr-12 mt-2 flex flex-col
     items-center text-2xl'>

      <p className="whitespace-nowrap px-4 animate-ad">
        {ad}
      </p>


      <ul className='flex flex-row text-[3vmin] mt-2 middle-ul z-10 space-x-8'>
        <ButtonsLi is_mobile={false} />
      </ul>
    </div>
  );
};
interface ButtonsLiProps {
  is_mobile: boolean;
}
//different classes for mobile/desktop
const ButtonsLi: React.FC<ButtonsLiProps> = ({ is_mobile }) => {
  return (
    <>
      <li>
        <button className={is_mobile ? 'ml-4 px-4 py-2 text-3xl rounded-lg' : ''}>
          <Link to='/'>
            Home
          </Link>
        </button>
      </li>
      <li >
        <button className={is_mobile ? 'px-4 py-2 text-3xl rounded-lg' : ''}>
          <Link to='/Account'>
            Account
          </Link>
        </button>
      </li>
    </>
  )
}

const SiteLogo = () => {
  return (
    <section className=''>
      <Link to='/'>
        <img src={require("./assets/NNlogo.png")} alt="logo"
          className="h-full w-auto flex " />
      </Link>
    </section>
  )
}
/*there will be a number positioned over this, 
showing how many items are in the cart(number of strings in the array)*/
const CartIcon = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className='ml-auto relative'>
      <div className='absolute top-16 right-10 text-lg text-white '>
        {cart.length}
      </div>
      <Link to='/Cart'>
        <img src={require("./assets/cart.png")} alt="cart"
          className="h-full w-auto ml-auto" />
      </Link>
    </div>
  );
};




const Navbar = () => {
  const [is_mobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section className='sticky top-0'>
      <nav className='main-nav bg-black neon-text w-full 
      h-32 flex '>
        {is_mobile ?
          <section className='flex flex-row top-btn'>
            <ul className='flex flex-row space-x-8 text-2xl mt-10'>
              <ButtonsLi is_mobile={true} />
            </ul>
            <CartIcon />
          </section>
          :
          <>
            <SiteLogo />
            <ReallyCoolScrollingText />
            <CartIcon />
          </>
        }
      </nav>
      <hr></hr>
    </section>
  )
};


const VolButton: React.FC = () => {
  const [isThemeSongOn, setIsThemeSongOn] = useState(false);
  //prevents multiple audio layers overlapping
  const NE = useRef(new Audio(ne));

  NE.current.loop = true;

  function toggleThemeSong() {
    console.log("toggleThemeSong called");
    if (isThemeSongOn) {
      NE.current.pause();
      setIsThemeSongOn(false);
    }
    else {
      NE.current.play();
      setIsThemeSongOn(true);
    }
  }

  return (
    <div className='sticky top-[9rem] z-10 w-full flex justify-end'>
      <button onClick={toggleThemeSong}
        className='text-white mr-4 py-2 px-4 rounded-lg '>
        {isThemeSongOn ?
          'Pause Theme Song' : 'Play Theme Song'}
      </button>
    </div>
  )
}

function App() {

  return (
    <>
      <Navbar />
      <VolButton />
      <audio>
        <source src='./assets/Neon Underground.wav' />
      </audio>
      <Routes>
        <Route path='/Cart' element={<CartElement />} />
        <Route path='/Checkout' element={<Checkout />} />
        <Route path='/Account' element={<Account />} />
        <Route path='/Product/:itemnumber' element={<ProductPage />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}


export default App;
