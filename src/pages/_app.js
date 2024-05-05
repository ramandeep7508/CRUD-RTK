import '@/styles/globals.css'
import '../styles/main.css'
import { Provider } from "react-redux";
import { store } from "../app/store";
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
   <>
    <div className='bg-slate-100 h-[100vh]'>
    <Provider store={store} >
       <Navbar />
       <Component {...pageProps} />    
       </Provider>
    </div>
     
   
   </>
  )

}
