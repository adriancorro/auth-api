import React, { useContext } from "react";
import UserContext from './UserContext';
import {
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";


    const Home_main_user = () => {

      const { statusLoginUser } = useContext(UserContext)
      let history = useHistory();
      useHistory();

        return (
           < div>
               <p>Hola {statusLoginUser }</p>
              <button   onClick= {()=>{
                              localStorage.removeItem('IsAuthenticated');
                              localStorage.removeItem('Token'); 
                              localStorage.removeItem('User'); 
                              history.replace("/")
                              window.location.reload(false); 
                        }}>Sign Out. 
              </button>
              <br></br>
              <img  width="100%" src="https://cdn.holidayguru.es/wp-content/uploads/2018/09/Azure-beach-with-rocky-mountains-and-clear-water-of-Indian-ocean-at-sunny-day-Bali-Indonesia-shutterstock_459773704.jpg" />
              <p>Indo</p>
          </div>
        )

   }  


  export default Home_main_user;