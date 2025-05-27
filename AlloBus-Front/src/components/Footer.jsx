import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import Logo from '../assets/LogoImage.png'
// text-[#2687e8]
const Footer = () => {
  return (
    <>
    <footer className="pb-4 h-[200px] text-white bg-[#051C34] flex flex-col justify-center items-center">

        <div className="flex items-center justify-around w-full mt-8 mb-8">
        <div className="  gap-x-1 flex flex-col items-center">
                <img src={Logo} className='w-16 h-16 '/>
                <span className="text-[#2687e8] text-lg font-bold ">AlloBus</span>
                
                </div>

          <div className="flex flex-col gap-y-4">
            <p className="flex items-center gap-x-4 ">
                <MapPin/> Hayableh
            </p>
            <p className="flex items-center gap-x-4">
                <Phone/> 77 45 56 23
            </p>
            <p className="flex items-center gap-x-4">
                <Mail/> Abdikani@gmail.com
            </p>

          </div>

          <div className="flex flex-col gap-y-4">
            <h1>Follow us </h1>
            <div className="flex gap-4">
            <Facebook/>
            <Instagram/>
            </div>


          </div>

        </div>
        <hr className='text-slate-700 w-[90%]  mx-4'/>
        <div className="pt-4  w-full flex justify-center">
        <p className='flex'>
         &copy; <span>Abdikani</span>
        </p>

        </div>

    </footer>

        
    </>
  )
}

export default Footer