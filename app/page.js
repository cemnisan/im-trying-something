'use client'

import { useEffect, useState } from 'react'
 
export default function Home() {
  const [isInstagram, setIsInstagram] = useState(true)
  
  useEffect(() => {
    let _isInstagram = document.referrer.includes("instagram")
    console.log(window.location.href)
    console.log(document.referrer.includes("instagram"))
    setIsInstagram(true)
  })

  function startIThrown(){
    document.location = 'com.alsay.bidsee://';
    setTimeout(function(){
      if(confirm('You do not seem to have iThrown installed, do you want to go download it now?')){
        document.location = 'https://beta.bidsee.app';
      }
    }, 300);
  }

  function deneme() { 
    if (isInstagram) { 
      /*var newURL = window.location.href.replace('https://', 'bidsee://')*/
      window.location.replace("com.alsay.bidsee://")
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
      <button onClick={startIThrown}>Tap me</button>
    </div>
  )
}