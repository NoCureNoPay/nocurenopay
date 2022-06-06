import Head from "next/head";
import NestedLayout from "../components/nested-layout";
import React, {useState} from 'react';
import axios from "../lib/axios";
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import { staticData } from "../data/Static-page";

export default function AboutUs({ faqs }) {
  console.log(faqs);
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
        <title>FAQ | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> {(language=='da')?(`${staticpageData.faqDEN}`):(`${staticpageData.faqEN}`)}</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
      <div className=" show_deta">
        <div className="container pxx">
          <div className="all_services b_list">
            {/* <h2 className="g_q">General Question</h2> */}
            {faqs.status == 200 ?
            <div className="accordion" id="accordionExample">
              {faqs.data.map((faq,index)=>(
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className={index==0?"accordion-button":"accordion-button collapsed"}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded={index==0?"true":"false"}
                    aria-controls={`collapse${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={index==0?"accordion-collapse collapse show":"accordion-collapse collapse"}
                  aria-labelledby={`#heading${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body" dangerouslySetInnerHTML={{ __html: faq.answer }}>
                  </div>
                </div>
              </div>
              ))}
            </div>
            :
            <div className="text-center alert-danger">{faqs.msg}</div>
          }
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
  const response = await axios.get(`/get-faqs?&lang=${lang}`);
  console.log(response);
  return {
    props: {
      faqs: response.data,
    },
  };
}

AboutUs.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
