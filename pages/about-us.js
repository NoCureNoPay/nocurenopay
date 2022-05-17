import Head from "next/head";
import NestedLayout from "../components/nested-layout";
import React from 'react';
import axios from '../lib/axios';
import { getCookies, setCookies, removeCookies } from 'cookies-next';

export default function AboutUs({about}) {
    console.log(about);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About Us | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> About Us</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
    <div className=" show_deta">
        <div className="container pxx">
            <div className="all_services" dangerouslySetInnerHTML={{ __html: about.content_body }}>
               
            </div>
        </div>
    </div>

    {/* <!-- requirement middle body part end --> */}
    </>
  );
}

export async function getServerSideProps({ req, res}) {
  let langSelected=getCookies({ req, res});
  let lang="";
  if (!langSelected.langSelected){ 
    setCookies('langSelected', 'en', { req, res, maxAge: 60 * 6 * 24 });
    lang="en";
  }else{
    lang=langSelected.langSelected;
  }
    const response=await axios.get(`/get-static-content?lang=${lang}&slug=about_us`);
    console.log(response);
    return {
      props:{
        about:response.data.data
      }
    }
  }

AboutUs.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
