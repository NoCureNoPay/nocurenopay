import Head from "next/head";
import NestedLayout from "../components/nested-layout";
import React, {useState} from 'react';
import axios from '../lib/axios';
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import { staticData } from "../data/Static-page";

export default function PrivacyPolicy({terms}) {
    console.log(terms);
    let staticpageData=staticData
  let myLan
 
  if (typeof window !== 'undefined') {
    myLan = localStorage.getItem('language')
  }
  const [language, setLanguage] = useState(myLan || 'da')
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Terms & Conditions | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> {(language=='da')?(`${staticpageData.termsDEN}`):(`${staticpageData.termsEN}`)}</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
    <div className=" show_deta">
        <div className="container pxx">
            <div className="all_services" dangerouslySetInnerHTML={{ __html: terms.content_body }}>
               
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
    setCookies('langSelected', 'da', { req, res, maxAge: 60 * 6 * 24 });
    lang="da";
  }else{
    lang=langSelected.langSelected;
  }
    const response=await axios.get(`/get-static-content?lang=${lang}&slug=terms_condition`);
    console.log(response);
    return {
      props:{
        terms:response.data.data
      }
    }
  }

PrivacyPolicy.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
