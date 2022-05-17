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

export default function ContactUs() {

    const {register, handleSubmit, formState: { errors },reset}=useForm();
    const router=useRouter();
    const MySwal = withReactContent(Swal);
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
        <h2 className="require_h2 text-center"> Become part of network</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
    <div className="container pxx">
       <div className="quote_top_section mt-5 mb-3">
                <h2 className="text-center">Many benefits of being a part of our network</h2>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur adipiscing <br></br> elit. Cras viverra eros quam</p>
            </div>
            <div className="row text-center justify-content-center my-5">
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src="/images/Meeting.gif" alt=""/>
                        <h2>More customers</h2>
                        <p>Lorem ipsum dolor sit amet,<br></br> consectetur adipis elit.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src="/images/Boy_cool.gif" alt=""/>
                        <h2>Business guarantee</h2>
                        <p>Lorem ipsum dolor sit amet,<br></br> consectetur adipis elit.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src="/images/3_PPl.gif" alt=""/>
                        <h2>Small competition</h2>
                        <p>Lorem ipsum dolor sit amet,<br></br> consectetur adipis elit.</p>
                    </div>
                </div>
            
             
                    
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src="/images/Call_center.gif" alt=""/>
                        <h2>Personal consultant</h2>
                        <p>Lorem ipsum dolor sit amet,<br></br> consectetur adipis elit. </p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                    <div className="quote_mini_box text-center">
                        <Image height="145" width="180" src="/images/Chat.gif" alt=""/>
                        <h2>Screening</h2>
                        <p>Lorem ipsum dolor sit amet,<br></br> consectetur adipis elit.</p>
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
                <Image height="145" width="180" className="" src="/images/hand_shake.png" alt=""/>
            </div>
                <h2 className="text-center">Many benefits of being a part of our network</h2>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur adipiscing <br></br> elit. Cras viverra eros quam</p>
            </div>
            <div className="form-floating mb-3 for_n">
                <input type="text" name="company_name" {...register('company_name', { required: true })} className="form-control colr" id="floatingInput" placeholder="Company name"/>
                <label htmlFor="floatingInput">Company name</label>
                <span className="errors">{errors.company_name?.type === 'required' && "Company name is required"}</span>
              </div>
              <div className="information_of_all">
                <div className="form-floating mb-3 name">
                    <input type="text" name="name" {...register('name', { required: true })} className="form-control colr" id="floatingInput" placeholder="Name"/>
                    <label htmlFor="floatingInput">Name</label>
                    <span className="errors">{errors.name?.type === 'required' && "Name is required"}</span>
                  </div>
                  <div className="form-floating telephone ">
                    <input type="text" name="phone" className="form-control colr" {...register('phone', { required: true })} id="floatingPassword" placeholder="Telephone"/>
                    <label htmlFor="floatingPassword">Telephone</label>
                    <span className="errors">{errors.phone?.type === 'required' && "Phone No. is required"}</span>
                </div>
               
            </div>
              <div className="information_of_all">
                <div className="form-floating mb-3 name">
                    <input type="email" name="email" {...register('email', { required: true })} className="form-control colr" id="floatingEmail" placeholder="Email"/>
                    <label htmlFor="floatingEmail">Email</label>
                    <span className="errors">{errors.email?.type === 'required' && "Email is required"}</span>
                  </div>
                  <div className="form-floating telephone ">
                    <input type="text" name="subject" {...register('subject', { required: true })} className="form-control colr" id="floatingSubject" placeholder="Subject"/>
                    <label htmlFor="floatingSubject">Subject</label>
                    <span className="errors">{errors.subject?.type === 'required' && "Subject is required"}</span>
                </div>
               
            </div>
            <textarea className="description" {...register('description', { required: true })} placeholder="Here you can add additional information (Not required)"></textarea>
            <span className="errors">{errors.description?.type === 'required' && "Description is required"}</span>
            <div className=" text-center pb-5 p_tenders">
                <button> Submit Now </button>
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


ContactUs.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
