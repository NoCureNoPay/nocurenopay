import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

import { useEffect } from "react";
import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <React.Fragment>
     <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-503NGSCB6Z`}
      />

      <Script id='google-analytics' strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-503NGSCB6Z', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-10941292230" />
      <Script id='google-adds'>
        {`
          window.dataLayer = window.dataLayer || \[\];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-10941292230');
        `}
        </Script>
        <Script id='google-adds2'>
          {`
            document.addEventListener('click', function(e) {
            if (e.target.matches('button\[type="submit"\] , \[type="submit"\] \*')) {
            var timer = setInterval(function() {
            if (document.querySelector('\[class="swal2-icon swal2-success swal2-icon-show"\]')) {
            gtag('event', 'conversion', {
            'send\_to': 'AW-10941292230/YqUZCIys\_MwDEMa9m-Eo'
            });
            clearInterval(timer);
            }
            }, 1000);
            }
            })
          `}

        </Script>
      <Component {...pageProps} />
    </React.Fragment>
  );
}