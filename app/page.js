'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isInstagram, setIsInstagram] = useState(true)
  const returnToAppLink = useRef(null);

  var url = 'bidsee://profile/240995729348595';
  var badURL = 'lksadjgajsdhfaskd://slkdfs';
  /*useEffect(() => {
    let _isInstagram = document.referrer.includes("instagram")
    console.log(window.location.href)
    console.log(document.referrer.includes("instagram"))
    setIsInstagram(true)
  })*/
  /*seEffect(() => {
    let timeoutTimer;

    if (returnToAppLink.current) {
      console.log(returnToAppLink.current)
      console.log(window.location.protocol + "//" + window.location.host)
      timeoutTimer = setTimeout(() => {
        openDeepLink(returnToAppLink.current, { onOpen: console.log, onFail: console.error });
        openDeepLink(url, { onOpen: console.log, onFail: console.error });
      }, 1000);
    }

    return () => clearTimeout(timeoutTimer);
  }, [returnToAppLink]);*/

  useEffect(() => {
    document.getElementById("l").src = url;

      setTimeout(function() {
          // Link to the App Store should go here -- only fires if deep link fails                
          window.location = "https://bidsee.app";
      }, 100000);
  }, []);

  function openDeepLink(url, options) {
    var _a, _b, _c;
    var timeout;
    var interval;
    var visible = 'visible';
    var handleOpen = function () {
      window.removeEventListener('visibilitychange', function () { return true; });
      (_a = options === null || options === void 0 ? void 0 : options.onOpen) === null || _a === void 0 ? void 0 : _a.call(options);
    };
    var handleResponse = function () {
      if (visible === 'visible')
        return (_b = options === null || options === void 0 ? void 0 : options.onFail) === null || _b === void 0 ? void 0 : _b.call(options);
      clearInterval(interval);
      handleOpen();
    };
    try {
      window.addEventListener('visibilitychange', function (e) { return (visible = e.target === null || e.target === void 0 ? void 0 : e.target.visibilityState); });
      timeout = setTimeout(handleResponse, (_c = (options === null || options === void 0 ? void 0 : options.waitTime) || 5000));
      interval = setInterval(function () {
        if (visible === 'hidden') {
          clearTimeout(timeout);
          handleResponse();
        }
      }, options === null || options === void 0 ? void 0 : options.waitTime || 5000);
      window.location.href = url;
    }
    catch (error) {
      var _d;
      (_d = options === null || options === void 0 ? void 0 : options.onFail) === null || _d === void 0 ? void 0 : _d.call(options);
    }
  }

  function deneme() {
    if (isInstagram) {
      /*var newURL = window.location.href.replace('https://', 'bidsee://')*/
      /*window.location.replace("com.alsay.bidsee://")*/
      openDeepLink("bidsee://profile/100004452732850", { onOpen: console.log, onFail: console.error })
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

  function register() {
     navigator.registerProtocolHandler("web+bidsee", "https://im-trying-something.vercel.app/%s")
  }

  return (
    <div>
      <p>Is user coming from instagram? {`${isInstagram}`} </p>
      <button>Tap me</button>
      <Link href="bidsee://" passHref legacyBehavior>
        <a ref={returnToAppLink}>Return to App</a>
      </Link>
     
    <iframe id="l" width="1" height="1" style=  {{visibility: 'hidden'}}></iframe>
    </div>
  )
}