'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isInstagram, setIsInstagram] = useState(true)
  const returnToAppLink = useRef(null);

  var url = 'fb://profile/240995729348595';
  var badURL = 'lksadjgajsdhfaskd://slkdfs';
  
  var linker = new DeepLinker({
    onIgnored: function() {
      console.log('browser failed to respond to the deep link');
    },
    onFallback: function() {
      console.log('dialog hidden or user returned to tab');
    },
    onReturn: function() {
      console.log('user returned to the page from the native app');
    },
  });

  /*useEffect(() => {
    let _isInstagram = document.referrer.includes("instagram")
    console.log(window.location.href)
    console.log(document.referrer.includes("instagram"))
    setIsInstagram(true)
  })*/
  useEffect(() => {
    let timeoutTimer;

    if (returnToAppLink.current) {
      console.log(returnToAppLink.current)
      console.log(window.location.protocol + "//" + window.location.host)
      timeoutTimer = setTimeout(() => {
        /*openDeepLink(returnToAppLink.current, { onOpen: console.log, onFail: console.error });*/
        linker.openURL(url)
      }, 1000);
    }

    return () => clearTimeout(timeoutTimer);
  }, [returnToAppLink]);

  useEffect(() => {
    if ('registerProtocolHandler' in navigator) {
      navigator.registerProtocolHandler('web+bidsee', 'http://localhost:3000/?url=%s', 'Bidsee');
    }
  }, []);

  function startIThrown() {
    document.location = 'com.alsay.bidsee://';
    setTimeout(function () {
      if (confirm('You do not seem to have iThrown installed, do you want to go download it now?')) {
        document.location = 'https://beta.bidsee.app';
      }
    }, 300);
  }

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
     navigator.registerProtocolHandler("web+bidsee", "https://bidsee.app")
  }

  function DeepLinker(options) {
    if (!options) {
      throw new Error('no options')
    }
  
    var hasFocus = true;
    var didHide = false;
  
    // window is blurred when dialogs are shown
    function onBlur() {
      hasFocus = false;
    };
  
    // document is hidden when native app is shown or browser is backgrounded
    function onVisibilityChange(e) {
      if (e.target.visibilityState === 'hidden') {
        didHide = true;
      }
    };
  
    // window is focused when dialogs are hidden, or browser comes into view
    function onFocus() {
      if (didHide) {
        if (options.onReturn) {
          options.onReturn();
        }
  
        didHide = false; // reset
      } else {
        // ignore duplicate focus event when returning from native app on
        // iOS Safari 13.3+
        if (!hasFocus && options.onFallback) {
          // wait for app switch transition to fully complete - only then is
          // 'visibilitychange' fired
          setTimeout(function() {
            // if browser was not hidden, the deep link failed
            if (!didHide) {
              options.onFallback();
            }
          }, 1000);
        }
      }
  
      hasFocus = true;
    };
  
    // add/remove event listeners
    // `mode` can be "add" or "remove"
    function bindEvents(mode) {
      [
        [window, 'blur', onBlur],
        [document, 'visibilitychange', onVisibilityChange],
        [window, 'focus', onFocus],
      ].forEach(function(conf) {
        conf[0][mode + 'EventListener'](conf[1], conf[2]);
      });
    }
  
    // add event listeners
    bindEvents('add');
  
    // expose public API
    this.destroy = bindEvents.bind(null, 'remove');
    this.openURL = function(url) {
      // it can take a while for the dialog to appear
      var dialogTimeout = 500;
  
      setTimeout(function() {
        if (hasFocus && options.onIgnored) {
          options.onIgnored();
        }
      }, dialogTimeout);
  
      window.location = url;
    };
  }

  return (
    <div>
      <p>Is user coming from instagram? {`${isInstagram}`} </p>
      <button>Tap me</button>
      <Link href="bidsee://" passHref legacyBehavior>
        <a ref={returnToAppLink}>Return to App</a>
      </Link>
    </div>
  )
}