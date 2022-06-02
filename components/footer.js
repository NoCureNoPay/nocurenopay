import Link from 'next/link';
import Image from "next/image";
import axios from "../lib/axios";
import React, {useState, useEffect} from 'react';
import ReactHtmlParser from "react-html-parser";
import { getCookies, setCookies, removeCookies } from 'cookies-next';

export default function Footer() {
  const [fetchCMSData, setFetchCMSData] = useState(1111);
  useEffect(() => {
    fetchDemo()
  }, []);

  const fetchDemo = async() => {
    let lang=getCookies('langSelected');
    const response=await axios.get(`/get-cms-content?lang=${lang.langSelected}&slug=footer_page`);
      // console.log(response);
      setFetchCMSData(response.data.data);
  }
  var context_dt = "";
  var context_dt2 = "";
if (fetchCMSData != 1111){
   context_dt = fetchCMSData[0].content_body;
   context_dt2 = fetchCMSData[1].content_body;
  //console.log(fetchCMSData);
} 
  return (
    <>
      <div className="site-footer">
        <div className="container">
          <div className="row justify-content-between align-item-center">
            <div className="col-lg-3 col-sm-12 col-12">
              <div className="footer-logo-link">
                <div className="logo_ftr custom_footer_logo">
                <Link href="/">
                  <a className="lgo-text mb-0"
                  >
                  <Image
                    src="/images/logo.png"
                    width={150}
                    height={31}
                    alt=""
                  />
                  </a>
                  </Link>
                </div>
                <p>
                {ReactHtmlParser( context_dt )}
                </p>

                <div className="footer-social">
                  <a href="https://www.facebook.com/">
                    <i className="icofont-facebook"></i>
                  </a>
                  <a href="https://twitter.com/">
                    <i className="icofont-twitter"></i>
                  </a>
                  <a href="https://www.Linkdin.com/">
                    <i className="icofont-linkedin"></i>
                  </a>
                  <a href="https://www.youtube.com/">
                    <i className="icofont-youtube-play"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row mt-3">
                <div className="col-lg-3 col-sm-6 col-6">
                  <div className="footer-logo-link">
                    <h2 className="footer-title">Company & Info</h2>
                    <ul>
                      <li>
                      <Link href="/about-us">
                        <a>About</a>
                        </Link>
                      </li>
                      {/* <li>
                        <a href="#">Services</a>
                      </li> */}
                      <li>
                        <Link href="/contact-us">
                        <a>Join as service provider</a>
                        </Link>
                      </li>
                      <li>
                      <Link href="/faq">
                        <a>FAQ</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-6">
                  <div className="footer-logo-link bottom_ftr">
                    <h2 className="footer-title"></h2>
                    <ul>
                      <li>
                        <Link href={"/blogs/list"}>
                        <a>Blog</a>
                        </Link>
                      </li>
                      <li>
                      <Link href="/terms-condition">
                        <a>Terms & conditions</a>
                        </Link>
                      </li>
                      <li>
                      <Link href={"/privacy-policy"}>
                        <a>Privacy policy</a>
                        </Link>
                      </li>
                      <li>
                      <Link href={"/contact-us"}>
                        <a>Contact us</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="footer-logo-link">
                    {/* <h2 className="footer-title">Newsletter</h2> */}
                    <ul>
                      <li>
                        {ReactHtmlParser( context_dt2 )}
                      </li>
                    </ul>
                    {/* <div className="search_bx_ftr">
                      <input
                        type="text"
                        placeholder="Enter your email address"
                      />
                      <button>
                        {" "}
                        <a href=""> SUBSCRIBE</a>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="end-sec">
          <div className="container">
            <div className="copy-right">
              <p>Copyright © 2022. All rights reserved. </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
