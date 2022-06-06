import Image from "next/image";
import Link from 'next/link';
import axios from "../lib/axios";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import {indexData} from './../data/Index';
import {staticData} from './../data/Static-page';

function getLangSelected() {
  const langSelected = getCookies('langSelected');
  
  if (!langSelected.langSelected) {
    console.log(langSelected);
    removeCookies('langSelected');
    setCookies('langSelected', "da");
    return "da";
  } else {
    return langSelected.langSelected;
  }
}
export default function Navbar({ cms }) {
  let myLan
  let indexpageData=indexData;
  let staticpageData=staticData;
  if (typeof window !== 'undefined') {
      myLan = localStorage.getItem('language')
  }

  const [fetchCMSData, setFetchCMSData] = useState(1111);
  const [langChoose, setLangChoose] = useState(myLan||'da');

  useEffect(() => {
    fetchDemo()
  }, []);

  const fetchDemo = async () => {
    let lang = getCookies('langSelected');
    const response = await axios.get(`/get-cms-content?lang=${lang.langSelected}&slug=banner_page`);
    // console.log(response);
    setFetchCMSData(response.data.data);
  }
  var context_dt = "";
  var context_dt2 = "";
  if (fetchCMSData != 1111) {
    context_dt = fetchCMSData[0].content_body;
    context_dt2 = fetchCMSData[1].content_body;
    //console.log(fetchCMSData);
  }

  const router = useRouter();
  const redirectRequirmentPage = () => {
    router.push('/requirement');
  }

  // const setLanguage = (e) => {
  //   const lang=e.target.dataset.id;
  //   removeCookies('langSelected');
  //   setCookies('langSelected', lang);
  //   setLangChoose(lang);
  //   router.push(window.location.pathname);
  //   fetchDemo()
  // }


  const handelLanguage = (lan) => {
    setLangChoose(lan)
    console.log(lan)
    if (lan === 'en') {
      localStorage.setItem('language','en');
      setCookies('langSelected', 'en');
    }else{
      localStorage.setItem('language','da');
      setCookies('langSelected', 'da');
    }
    document.location.reload(true)
  }




  return (
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light pt-4">
          <Link href="/">
            <a className="navbar-brand text-white font-weight-bold custom_header_logo drkbg">
              <Image
                src="/images/logo.png"
                width={150}
                height={31}
                alt=""
              />
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler text-white">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto">
              <li className="nav-item active ">
                <Link href="/">
                  <a className="nav-link text-white">
                  {(langChoose=='da')?(`${staticpageData.homeDEN}`):(`${staticpageData.homeEN}`)}
                  </a>
                </Link>
              </li>
              {/* <li className="nav-item active ">
              <Link href="/contact-us">
                <a className="nav-link text-white">
                Apply to network
                </a>
                </Link>
              </li>
              <li className="nav-item active mx-2 ">
              <Link href={"/blogs/list"}>
                <a className="nav-link text-white">
                  Services blog
                </a>
                </Link>
              </li>
              <li className="nav-item active">
              <Link href="/about-us">
                <a className="nav-link text-white">
                  About
                </a>
                </Link>
              </li> */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {(langChoose=='da')?(`${staticpageData.aboutDEN}`):(`${staticpageData.aboutEN}`)}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link href="/contact-us"><a className="dropdown-item">{(langChoose=='da')?(`${staticpageData.networkDEN}`):(`${staticpageData.networkEN}`)}</a></Link></li>
                  <li><Link href="/blogs/list"><a className="dropdown-item">{(langChoose=='da')?(`${staticpageData.serviceblogDEN}`):(`${staticpageData.serviceblogEN}`)}</a></Link></li>
                  <li><Link href="/about-us"><a className="dropdown-item" >{(langChoose=='da')?(`${staticpageData.aboutusDEN}`):(`${staticpageData.aboutusEN}`)}</a></Link></li>
                </ul>
              </li>

              <li className="nav-item active mx-2">
                <Link href="/tenders">
                  <a className="nav-link text-white">
                  {(langChoose=='da')?(`${staticpageData.tendersDEN}`):(`${staticpageData.tendersEN}`)}
                  </a>
                </Link>
              </li>
              <li className="nav-item active">
                <Link href="/hire-a-fixer">
                  <a className="nav-link text-white">
                  {(langChoose=='da')?(`${staticpageData.hireafixerDEN}`):(`${staticpageData.hireafixerEN}`)}
                  </a>
                </Link>
              </li>
              <li className="nav-item active pr-2 mx-2">
                <Link href="/requirement">
                  <a className="nav-link text-white bor_radius">
                    {" "}
                    {(langChoose=='da')?(`${staticpageData.offersDEN}`):(`${staticpageData.offersEN}`)}
                  </a>
                </Link>
              </li>
              <li className="nav-item dropdown new">
                <a
                  className="nav-link dropdown-toggle immg"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {(langChoose == "en") ?
                    <Image
                      src="/images/download.jfif"
                      width={30}
                      height={20}
                      alt=""
                    />
                    :
                    <Image
                      src="/images/Flag_of_Denmark.jfif"
                      width={30}
                      height={20}
                      alt=""
                    />
                  }
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {(langChoose == "en") ?
                    <a onClick={() => { handelLanguage('da') }} className="dropdown-item" href="#" data-id="da">
                      Danish
                    </a>
                    :
                    <a onClick={() => { handelLanguage('en') }} className="dropdown-item" href="#" data-id="en">
                      English
                    </a>
                  }
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/*<!-- banner part start-->*/}
        <div className="banner_part">
          <h2 className="text-white" dangerouslySetInnerHTML={{ __html: context_dt }}>

          </h2>
          <p dangerouslySetInnerHTML={{ __html: context_dt2 }}>
          </p>
          <button onClick={redirectRequirmentPage}>{(langChoose=='da')?(`${indexpageData.postDEN}`):(`${indexpageData.postEN}`)}</button>
        </div>
        {/*<!-- banner part end-->*/}
      </div>
    </div>
  );
}


