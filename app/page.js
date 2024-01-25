'use client'

import { useEffect, useState } from 'react'
 
export default function Home() {
  const [isInstagram, setIsInstagram] = useState(false)
  
  useEffect(() => {
    let _isInstagram = document.referrer.includes("instagram")
    console.log(window.location.href)
    console.log(document.referrer.includes("instagram"))
    setIsInstagram(_isInstagram)
  })

  function deneme() { 
    if (isInstagram) { 
      var newURL = window.location.href.replace('https://', 'bidsee://')
      window.location.replace(newURL) 
      /*var change = false */

      /*setTimeout(() => {
        if (!change) { 
          var redirectURL = "https://im-trying-something.vercel.app/"
          window.location = redirectURL
          return
        }
      }, 3000)

      var newURL = window.location.href.replace('https://im-trying-something.vercel.app/', 'bidsee://deneme?q=123')
      window.location.replace(newURL)


      window.onblur = function () { 
        change = true;
      }

      window.onfocus = function () { 
        change = false;
      }*/

    } else { 
      // do nothing.
    }
  }

  return (
    <div>
      <p>Is user coming from instagram? {`${isInstagram}`} </p>
      {deneme()}
    </div>
  )
}