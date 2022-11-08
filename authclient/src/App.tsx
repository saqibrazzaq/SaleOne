import React, { useEffect } from 'react'
import { login } from './services/auth.service';
import { getPrivateContent, getPublicContent } from './services/category.service';

const App: React.FC = () => {

  useEffect(() => {
    login("saqibrazzaq@gmail.com", "Saqib123!").then(res => {
      console.log(res.data);

      privateContent();
      publicContent();
    })
    
  }, []);

  const privateContent = () => {
    console.log("Below is private content")
    getPrivateContent().then(res => {
      console.log(res.data);
    })
  }

  const publicContent = () => {
    console.log("Below is public content");
    getPublicContent().then(res => {
      console.log(res.data);
    })
  }

  return (
    <div>App</div>
  )
}

export default App