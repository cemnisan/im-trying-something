'use client'

import { useEffect, useState } from 'react'
 
export default function Home() {
  const [isInstagram, setIsInstagram] = useState(false)
  
  useEffect(() => {
    let _isInstagram = navigator.userAgent.includes("instagram")
    setIsInstagram(_isInstagram)
  })

  function deneme() { 
    if (isInstagram) { 
      /*let newURL = window.location.href.replace('localhost:3000/', 'localhost:3000/.well-known/apple-app-site-assocation')
      window.location.replace(newURL) */
      var change = false 

      setTimeout(() => {
        if (!change) { 
          var redirectURL = "localhost:3000/"
          window.location = redirectURL
        }
      }, 3000)

      var newURL = window.location.href.replace('localhost:3000/', 'localhost:3000/.well-known/apple-app-site-assocation')
      window.location.replace(newURL)


      window.onblur = function () { 
        change = true;
      }

      window.onfocus = function () { 
        change = false;
      }

    } else { 
      // do nothing.
    }
  }

  return (
    <div>
      <p>Is user coming from instagram? {`${isInstagram}`} </p>
      { deneme() }
    </div>
  )
}