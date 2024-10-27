import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Main from './pages/main/Main';
import Footer from './components/footer/Footer';
//import Consultation from './pages/consultation/Consultation'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import FloaterPage from './pages/floater/FloaterPage';

import SmartContractContext from './scripts/SmartContractContext';


const App = () => {
     let [user_address, setAddress_Context] = useState(null);
     let [user_token_ID, setTokenID_Context] = useState(null);
     let [user_balance, setBalance_Context] = useState(null);
     let [user_metadata, setMetadata_Context] = useState(null);
     let [user_avatar_URI, setAvatarURI_Context] = useState(null);
     return (
          <SmartContractContext.Provider value={{ user_address, setAddress_Context,
                                                  user_balance, setBalance_Context,
                                                  user_token_ID, setTokenID_Context,
                                                  user_metadata, setMetadata_Context,
                                                  user_avatar_URI, setAvatarURI_Context }}>
               {/* <BrowserRouter> */}
                    <Navbar />
                    {/*/<Background />*/}
                    <Main />
                    {/* <Routes>
                         <Route exact path="/" element={<Main />} />
                         <Route exact path="/consultation" element={<Consultation />} />
                    </Routes> */}
                    <Footer />
               {/* </BrowserRouter> */}
          </SmartContractContext.Provider>
     )
}

export default App
