import Head from "next/head";
import Image from "next/image";
import NestedLayout from "../components/nested-layout";
import axios from "../lib/axios";
import {useForm} from 'react-hook-form';
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, {useState} from 'react';
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import { getCookies, setCookies,checkCookies, removeCookies } from 'cookies-next';
import { contactusData } from "../data/Contact-us";

export default function ContactUs({cmss}) {
    console.log(cmss);
    const {register, handleSubmit, formState: { errors },reset}=useForm();
    const router=useRouter();
    const MySwal = withReactContent(Swal);
    let contactpageData=contactusData;
  let myLan
 
  if (typeof window !== 'undefined') {
    myLan = localStorage.getItem('language')
  }
  const [language, setLanguage] = useState(myLan || 'da')
    function onSubmit(values)
    {
        const formdata = new FormData();
        formdata.append('name',values.name);
        formdata.append('email',values.email);
        formdata.append('subject',values.subject);
        formdata.append('description',values.description);
        formdata.append('phone',values.phone);
        formdata.append('company_name',values.company_name);
      console.log(formdata);
      MySwal.fire({
        text: "Sumitting your proposal.Please wait...",
        icon: "info",
        buttonsStyling: false,
        showConfirmButton: false
    });
      const response=axios.post('/post-proposal', formdata)
      .then(function (response) {
        console.log(response);
        MySwal.fire({
          text: response.data.msg,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
              confirmButton: "btn fw-bold btn-primary",
          }
      }).then(function () {
        reset();
        // router.push("/contact-us");
      });
      })
      .catch(function (error) {
        if(error.response){
          console.log(error.response);
            
        }else{
          MySwal.fire({
              text: error.message,
              icon: "error",
              buttonsStyling: false,
              showConfirmButton: false,
              timer: 2000
          })
        }
      });
    }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact us | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner private_banner">
        <h2 className="require_h2 text-center"> {(language=='da')?(`${contactpageData.headingDEN}`):(`${contactpageData.headingEN}`)}</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
    <div className="container pxx">
       <div className="quote_top_section mt-5 mb-3">
                <h2 className="text-center">{ReactHtmlParser( cmss[0].content_body )}</h2>
                {ReactHtmlParser( cmss[1].content_body )}
            </div>
            <div className="row text-center justify-content-center my-5">
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src={cmss[2].image} alt=""/>
                        <h2>{ReactHtmlParser( cmss[3].content_body )}</h2>
                        {ReactHtmlParser( cmss[4].content_body )}
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src={cmss[5].image} alt=""/>
                        <h2>{ReactHtmlParser( cmss[6].content_body )}</h2>
                        {ReactHtmlParser( cmss[7].content_body )}
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src={cmss[8].image} alt=""/>
                        <h2>{ReactHtmlParser( cmss[9].content_body )}</h2>
                        {ReactHtmlParser( cmss[10].content_body )}
                    </div>
                </div>
            
             
                    
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src={cmss[11].image} alt=""/>
                        <h2>{ReactHtmlParser( cmss[12].content_body )}</h2>
                        {ReactHtmlParser( cmss[13].content_body )}
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src={cmss[14].image} alt=""/>
                        <h2>{ReactHtmlParser( cmss[15].content_body )}</h2>
                        {ReactHtmlParser( cmss[16].content_body )}
                    </div>
                </div>
          </div>
    </div>
   {/* <!-- many benifits section end -->/ */}
     {/* <!-- form section start --> */}
     <div className="main_deal">
     <div className="container pxx py-5">
         <form onSubmit={handleSubmit(onSubmit)}>
         <div className="make_deal ">
            <div className="quote_top_section mt-5 mb-3">
                <div className="hand_shake text-center py-3">
                <Image height="145" width="180" className="" src={cmss[17].image} alt=""/>
            </div>
                <h2 className="text-center">{ReactHtmlParser( cmss[18].content_body )}</h2>
                {ReactHtmlParser( cmss[19].content_body )}
            </div>
            <div className="form-floating mb-3 for_n">
                <input type="text" name="company_name" {...register('company_name', { required: true })} className="form-control colr" id="floatingInput" placeholder="Company name"/>
                <label htmlFor="floatingInput">{(language=='da')?(`${contactpageData.companyDEN}`):(`${contactpageData.companyEN}`)}</label>
                <span className="errors">{errors.company_name?.type === 'required' && ((language=='da')?(`${contactpageData.companyrequriedDEN}`):(`${contactpageData.companyrequriedEN}`))}</span>
              </div>
              <div className="information_of_all">
                <div className="form-floating mb-3 name">
                    <input type="text" name="name" {...register('name', { required: true })} className="form-control colr" id="floatingInput" placeholder="Name"/>
                    <label htmlFor="floatingInput">{(language=='da')?(`${contactpageData.nameDEN}`):(`${contactpageData.nameEN}`)}</label>
                    <span className="errors">{errors.name?.type === 'required' && ((language=='da')?(`${contactpageData.namerequriedDEN}`):(`${contactpageData.namerequriedEN}`))}</span>
                  </div>
                  <div className="form-floating telephone ">
                    <input type="text" name="phone" className="form-control colr" {...register('phone', { required: true })} id="floatingPassword" placeholder="Telephone"/>
                    <label htmlFor="floatingPassword">{(language=='da')?(`${contactpageData.telephoneDEN}`):(`${contactpageData.telephoneEN}`)}</label>
                    <span className="errors">{errors.phone?.type === 'required' && ((language=='da')?(`${contactpageData.phonereqiriedDEN}`):(`${contactpageData.phonereqiriedEN}`))}</span>
                </div>
               
            </div>
              <div className="information_of_all">
                <div className="form-floating mb-3 name">
                    <input type="email" name="email" {...register('email', { required: true })} className="form-control colr" id="floatingEmail" placeholder="Email"/>
                    <label htmlFor="floatingEmail">{(language=='da')?(`${contactpageData.emailDEN}`):(`${contactpageData.emailEN}`)}</label>
                    <span className="errors">{errors.email?.type === 'required' && ((language=='da')?(`${contactpageData.emailrequriedDEN}`):(`${contactpageData.emailrequriedEN}`))}</span>
                  </div>
                  <div className="form-floating telephone ">
                    <input type="text" name="subject" {...register('subject', { required: true })} className="form-control colr" id="floatingSubject" placeholder="Subject"/>
                    <label htmlFor="floatingSubject">{(language=='da')?(`${contactpageData.subjectDEN}`):(`${contactpageData.subjectEN}`)}</label>
                    <span className="errors">{errors.subject?.type === 'required' && ((language=='da')?(`${contactpageData.subjectrequriedDEN}`):(`${contactpageData.subjectrequriedEN}`))}</span>
                </div>
               
            </div>
            <textarea className="description" {...register('description', { required: true })} placeholder="Here you can add additional information (Not required)"></textarea>
            <span className="errors">{errors.description?.type === 'required' && ((language=='da')?(`${contactpageData.descriptionrequriedDEN}`):(`${contactpageData.descriptionrequriedEN}`))}</span>
            <div className=" text-center pb-5 p_tenders">
                <button> {(language=='da')?(`${contactpageData.submitbuttonDEN}`):(`${contactpageData.submitbuttonEN}`)} </button>
            </div>
         </div>
         </form>
     </div>
    </div>

     {/* <!-- form section end --> */}
      {/*<!-- requirement middle body part end -->*/}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  let langSelected=getCookies({ req, res});
  let lang="";
  if (!langSelected.langSelected){ 
    setCookies('langSelected', 'da', { req, res, maxAge: 60 * 6 * 24 });
    lang="da";
  }else{
    lang=langSelected.langSelected;
  }
  
  const [cms] = await Promise.all([ 
    axios.get(`/get-cms-content?lang=${lang}&slug=contact_us`)
  ]);
  const [cmss] = await Promise.all([
    cms.data.data,
  ]);
  return { props: { cmss } };
}

ContactUs.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
