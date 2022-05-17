import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import NestedLayout from "../components/nested-layout";
import axios from "../lib/axios";
import {useForm} from 'react-hook-form';
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, {useState} from 'react';
import { getCookies, setCookies, removeCookies } from 'cookies-next';

export default function HireAFixer({terms}) {
  const {register, handleSubmit, formState: { errors },reset}=useForm();
  const router=useRouter();
  const MySwal = withReactContent(Swal);
  const [file, setFile] = useState();
  function handleChange(event) {
    setFile(event.target.files);
    console.log(event.target.files);
    errors.file="";
    for (var i = 0; i < event.target.files.length; i++) {
      var files = event.target.files[i];
      if(files.size > 20048576)
      {
         errors.file={ "message":"file size too large.",'type':"size","ref":"<input />"};
      }
      const sp=files.type.split("/");
      var arr = ["jpg", "jpeg", "png","webp"];
      console.log(sp);
      console.log(arr.includes(sp[1]));
      if(arr.includes(sp[1])==false)
      {
        errors.file={ "message":"file size too large.",'type':"type","ref":"<input />"};
      }
    }
  }
  function onSubmit(values)
  {
    console.log(file);
    // return false;
    const formdata = new FormData();
    if(file!=undefined)
    {
      for (var i = 0; i < file.length; i++) {
        var files = file[i];
        formdata.append('file[]', files);
        formdata.append('fileName[]', files.name);
      }
    }
    formdata.append('name',values.name);
    formdata.append('accept_checkbox',values.accept_checkbox);
    formdata.append('address',values.address);
    formdata.append('description',values.description);
    formdata.append('email',values.email);
    formdata.append('phone',values.phone);
    formdata.append('zipcode',values.zipcode);
    formdata.append('title',values.title);
    formdata.append('deadline',values.deadline);
    formdata.append('budget',values.budget);
    formdata.append('currency',values.currency);
    console.log(formdata);
    MySwal.fire({
      text: "Requesting your requrirement.Please wait...",
      icon: "info",
      buttonsStyling: false,
      showConfirmButton: false
  });
    const response=axios.post('/post-hire-fixer', formdata)
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
      router.push("/");
    });
    })
    .catch(function (error) {
      if(error.response){
        console.log(error.response);
          MySwal.fire({
              text: "Upload proper images.",
              icon: "error",
              buttonsStyling: false,
              showConfirmButton: false,
              timer: 3000
          })
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
        <title>Hire a fixer | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> Hire a fixer</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
    <div className="requirement_middle_body">
        <div className="container pxx">
            <div className="all_services">
              <div className="requirement_decription_area text-center ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                       
                        <div className="accept">
                            <div className="form-floating a_title">
                                <input type="text" className="form-control colr" name="title"  {...register('title', { required: true})} id="floatingInput" placeholder="name"/>
                                <label htmlFor="floatingInput">Add title</label>
                                <span className="errors">{errors.title?.type === 'required' && "Title is required"}</span>
                              </div>
                              <div className="t_area"> 
                              <textarea className="description" {...register('description', { required: true })} name="description" placeholder="Give a short description of your requirement here"></textarea>
                              <span className="errors">{errors.description?.type === 'required' && "Description is required"}</span>
                        <div className="peacture_file">
                          <input type="file" {...register('file', {size:true,type:true })} name="file" accept="image/*" onChange={handleChange} multiple></input> (Optional)
                        </div>
                        <span className="errors">{errors.file?.type === 'required' && "File is required"}</span>
                        <span className="errors">{errors.file?.type === 'size' && "file size too large.Maximum 20MB."}</span>
                        <span className="errors">{errors.file?.type === 'type' && "files must be a file of type: jpg, jpeg, png, webp"}</span>
                        </div>
                        <div className="information_of_all">
                            <div className="form-floating mb-3 a_deadline">
                                <input type="date" className="form-control colr" id="floatingInput" name="deadline" {...register('deadline', { required: true})} placeholder="Add deadline"/>
                                <label htmlFor="floatingInput">Add deadline</label>
                                <i className="icofont-ui-calendar"></i>
                                <span className="errors">{errors.deadline?.type === 'required' && "Deadline is required"}</span>
                              </div>
                              <div className="form-floating a_budget ">
                                <input type="number" className="form-control colr" id="floatingPassword" name="budget" {...register('budget', { required: true,min:1})} placeholder="Add your budget"/>
                                <label htmlFor="floatingPassword">Add your budget</label>
                                <i className="icofont-dollar"></i>
                                <span className="errors">{errors.budget?.type === 'required' && "Budget amount is required"}</span>
                                <span className="errors">{errors.budget?.type === 'min' && "The budget will be more than 0"}</span>
                            </div>
                           
                        </div>
                        <div className="information_of_all">
                            <div className="form-floating mb-3 mob">
                                <input type="number" className="form-control colr" id="floatingInput" placeholder="Phone" {...register('phone', { required: true })}/>
                                <label htmlFor="floatingInput">Phone</label>
                                <span className="errors">{errors.phone?.type === 'required' && "Phone number is required"}</span>
                              </div>
                              <div className="form-floating mail ">
                                <input type="email" className="form-control colr" id="floatingPassword" {...register('email',{ required: true})} placeholder="E-mail"/>
                                <label htmlFor="floatingPassword">E-mail</label>
                                <span className="errors">{errors.email?.type === 'required' && "Email is required"}</span>
                            </div>
                    
                        </div>
                        <div className="form-floating mb-3 for_n">
                            <input type="text" className="form-control colr" id="floatingInput" {...register('name',{ required: true})} placeholder="name example"/>
                            <label htmlFor="floatingInput">Name</label>
                            <span className="errors">{errors.name?.type === 'required' && "Name is required"}</span>
                          </div>

                          <div className="information_of_all">
                            <div className="form-floating mb-3 adr">
                                <input type="text" className="form-control colr " {...register('address',{ required: true})} id="floatingInput" placeholder="Address"/>
                                <label htmlFor="floatingInput">Address</label>
                                <span className="errors">{errors.address?.type === 'required' && "address is required"}</span>
                              </div>
                              <div className="form-floating zip">
                                <input type="text" className="form-control colr " {...register('zipcode',{ required: true})} id="floatingPassword" placeholder="code"/>
                                <label htmlFor="floatingPassword">ZIP-code</label>
                                <span className="errors">{errors.zipcode?.type === 'required' && "Zipcode is required"}</span>
                            </div>
                        </div>
                        <div className="form-floating mb-3 for_n">
                            <select className="form-control colr" name="currency" {...register('currency',{ required: true})}>
                              <option value="Dkk">Dkk</option>
                              <option value="Euro">Euro</option>
                              <option value="Usd">Usd</option>
                              <option value="BTC">BTC</option>
                              <option value="ETH">ETH</option>
                            </select>
                            <label htmlFor="currency">Currency</label>
                            <span className="errors">{errors.currency?.type === 'required' && "Currency is required"}</span>
                          </div>
                          <div className="condition">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" {...register('accept_checkbox',{ required: true})}/>
                                <label className="form-check-label " htmlFor="exampleCheck1"> I accept the <a data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">conditions </a>  and <Link href="/privacy-policy"><a>privacy policy</a></Link></label>
                                {/* <!-- Modal --> */}
                      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                              <div style={{borderBottom : '0'}} className="modal-header">
                          
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body m_body">
                              {/* <!-- requirement middle body part start --> */}
                          <div className=" show_deta">
                              <div style={{padding : '0px 26px'}} className="container">
                                  <div style={{margin : '21px 0px 0px 0px'}} className="">
                                    <h2  className="text-center t_c ">Terms and Conditions</h2>
                                    <div dangerouslySetInnerHTML={{ __html: terms.content_body }}>

                                    </div>
                                    
                                  </div>
                              </div>
                          </div>

                          {/* <!-- requirement middle body part end --> */}

                              </div>
                            
                            </div>
                          </div>
                        </div>
                                {/* <!-- modal section end --> */}
                              </div>  
                          </div>
                          <div className="for_required">
                          <span className="errors">{errors.accept_checkbox?.type === 'required' && "Checkbox is required"}</span>
                          </div>
                          <div className="get_offer text-center">
                              <button>Submit Your Requirement</button>
                          </div>
                        </div>
                    </form>
                </div>
            </div>
          </div>
          </div>      

      {/*<!-- requirement middle body part end -->*/}
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
  const response=await axios.get(`/get-static-content?lang=${lang}&slug=terms_condition`);
  console.log(response);
  return {
    props:{
      terms:response.data.data
    }
  }
}

HireAFixer.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
