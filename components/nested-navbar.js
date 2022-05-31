import Image from "next/image";
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import axios from "../lib/axios";
import Router from 'next/router';

function getLangSelected() {
    const langSelected = getCookies('langSelected');
    if (!langSelected.langSelected){ 
        removeCookies('langSelected');
        setCookies('langSelected', "en");
        return "en";
    }else{
        return langSelected.langSelected;
    }
  }
export default function NestedNavbar() {
    const [fetchCMSData, setFetchCMSData] = useState(1111);
    const [langChoose, setLangChoose] = useState(getLangSelected);
    useEffect(() => {
        fetchDemo()
      }, []);
    
      const fetchDemo = async() => {
        let lang=getCookies('langSelected');
        const response=await axios.get(`/get-cms-content?lang=${lang.langSelected}&slug=banner_page`);
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

    const setLanguage = (e) => {
        const lang=e.target.dataset.id;
        removeCookies('langSelected');
        setCookies('langSelected', lang);
        setLangChoose(lang);
        Router.push(window.location.pathname);
        fetchDemo()
      }
    return (
        <div className="header_2">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light py-4">
                <Link href="/">
                <a className="navbar-brand text-black font-weight-bold logo custom_header_logo">
                <Image
                    src="/images/logo.png"
                    width={150}
                    height={31}
                    alt=""
                />
                </a>
                </Link>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler text-black"><i className="fa fa-bars" aria-hidden="true"></i></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  ms-auto">
                        <li className="nav-item active ">
                            <Link href="/">
                            <a className="nav-link text-black">Home </a>
                            </Link>
                        </li>
                        {/* <li className="nav-item active ">
                            <Link href="/contact-us">
                            <a className="nav-link text-black">Apply to network </a>
                            </Link>
                        </li>
                        <li className="nav-item active mx-2 ">
                        <Link href={"/blogs/list"}>
                            <a className="nav-link text-black">Services blog</a>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link href="/about-us">
                            <a className="nav-link text-black">About </a>
                            </Link>
                        </li> */}
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            About
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link href="/contact-us"><a className="dropdown-item">Apply to network</a></Link></li>
                            <li><Link href="/blogs/list"><a className="dropdown-item">Services blog</a></Link></li>
                            <li><Link href="/about-us"><a className="dropdown-item" >About us</a></Link></li>
                        </ul>
                        </li>
                        <li className="nav-item active mx-2">
                            <Link href="/tenders">
                            <a className="nav-link text-black">See private tenders</a>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link href="/hire-a-fixer">
                            <a className="nav-link text-black"> Hire a fixer </a>
                            </Link>
                        </li>
                        <li className="nav-item active pr-2 mx-2">
                            <Link href="/requirement">
                            <a className="nav-link text-white bor_radius"> Get 3 offers </a>
                            </Link>
                        </li>
                        <li className="nav-item dropdown new">
                            <a className="nav-link dropdown-toggle  immg" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {(langChoose=="en")?
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
                            {(langChoose=="en")?
                                <a onClick={setLanguage} className="dropdown-item" href="#" data-id="da">
                                    Danish
                                </a>
                                :
                                <a onClick={setLanguage} className="dropdown-item" href="#" data-id="en">
                                    English
                                </a>
                                }
                            </div>
                        </li>

                    </ul>

                </div>
            </nav>
        </div>
    </div>
    );
}