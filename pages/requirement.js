import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NestedLayout from "../components/nested-layout";
import axios from "../lib/axios";
import {useForm} from 'react-hook-form';
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React, {useState} from 'react';
import { getCookies, setCookies, removeCookies } from 'cookies-next';

export default function Requirement({categories,terms}) {
  console.log(categories);
  const {register, handleSubmit, formState: { errors },reset}=useForm();
  const [isActive, setActive] = useState("false");
  const router=useRouter();
  const MySwal = withReactContent(Swal);
  const [file, setFile] = useState();
  const [category, setCategory] = useState();
  const toggledescrip = () => {
    setActive(!isActive);  
  };
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
      var arr = ["jpg", "jpeg", "png"];
      console.log(sp);
      console.log(arr.includes(sp[1]));
      if(arr.includes(sp[1])==false)
      {
        errors.file={ "message":"file size too large.",'type':"type","ref":"<input />"};
      }
    }
  }

  function changeRadio(e) {
    const val=e.target.value;
    if(val=="12")
    {
      router.push("/hire-a-fixer");
    }else{
      setCategory(e.target.value);
    }
  }

  function onSubmit(values)
  {
    console.log(values);
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
    formdata.append('category',category);
    formdata.append('description',values.description);
    formdata.append('email',values.email);
    formdata.append('phone',values.phone);
    formdata.append('zipcode',values.zipcode);
    console.log(formdata);
    MySwal.fire({
      text: "Requesting your requrirement.Please wait...",
      icon: "info",
      buttonsStyling: false,
      showConfirmButton: false
  });
    const response=axios.post('/post-requrirement', formdata)
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
        <title>Requirement | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> Describe your requirement</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
      <div className="requirement_middle_body">
        <div className="container pxx">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="all_services">
              <div className="main_btn_box">
                <b>Choose Category First</b><br></br>
                {categories.map((category,index)=>(
                  <div className="mini_btn_box news" key={index}>
                    <label className="service_btn_b">
                      <input type="radio" name="category_id" {...register('category_id', { required: true })} value={category.category_id} onChange={changeRadio} />
                      <span>
                        <Image
                          src={category.image}
                          width={26}
                          height={26}
                          alt=""
                        />
                        {category.name}
                      </span>
                    </label>
                  </div>
                ))}
                <div className="clr"></div>
              </div>
              <span className="errors">{errors.category_id?.type === 'required' && "Category is required"}</span>
              <div className="requirement_decription_area text-center ">
                <h3 className="plus_example">
                  {" "}
                  <a href="#javascript" onClick={toggledescrip}>
                    {" "}
                    + see example of a good requirement decription here{" "}
                  </a>
                </h3>
                <div className={isActive ? 'infomainbxnw d-none': 'infomainbxnw '}>
                    <div className="infonwtop__modal_box">
                      
                        <div className="craftform__modal_meta">
                            <span className="craftform__modalpretext">Example</span>
                            <span className="craftform__modalicon close" onClick={toggledescrip}><i className="fa fa-times" aria-hidden="true"></i></span>
                        </div>
                        <div className="craftform__modal_content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et scelerisque diam. Curabitur sodales sit amet purus id malesuada.</p></div>
                    </div>
                </div>
                <div className="accept">
                  <div className="t_area">
                  <textarea className="description" {...register('description', { required: true })} name="description" placeholder="Give a short description of your requirement here">
                  </textarea>
                  <span className="errors">{errors.description?.type === 'required' && "Description is required"}</span>
                 
                  
                  <div className="peacture_file">
                    <input type="file" {...register('file', { size:true,type:true })} name="file" onChange={handleChange} accept="image/*" multiple></input> (Optional)
                    
                  </div>
                  <span className="errors">{errors.file?.type === 'required' && "File is required"}</span>
                  <span className="errors">{errors.file?.type === 'size' && "file size too large.Maximum 20MB."}</span>
                  <span className="errors">{errors.file?.type === 'type' && "files must be a file of type: jpg, jpeg, png"}</span>
                  </div>
                  <div className="information_of_all">
                    <div className="form-floating mb-3 mob">
                      <input
                        type="number"
                        className="form-control colr"
                        id="floatingInput" name="phone" {...register('phone', { required: true})}
                        placeholder="8210185038"
                      />
                      <label htmlFor="floatingInput">Phone</label>
                      <span className="errors">{errors.phone?.type === 'required' && "Phone number is required"}</span>
                    </div>
                    <div className="form-floating mail ">
                      <input
                        type="email"
                        className="form-control colr"
                        id="floatingPassword" name="email" {...register('email',{ required: true})}
                        placeholder="E-mail"
                      />
                      <label htmlFor="floatingPassword">E-mail</label>
                      <span className="errors">{errors.email?.type === 'required' && "Email is required"}</span>
                    </div>
                  </div>
                  <div className="form-floating mb-3 for_n">
                    <input
                      type="text"
                      className="form-control colr"
                      id="floatingInput" name="name" {...register('name',{ required: true})}
                      placeholder="name"
                    />
                    <label htmlFor="floatingInput">Name</label>
                    <span className="errors">{errors.name?.type === 'required' && "Name is required"}</span>
                  </div>

                  <div className="information_of_all">
                    <div className="form-floating mb-3 adr">
                      <input
                        type="digit"
                        className="form-control colr "
                        id="floatingInput" name="address" {...register('address',{ required: true})}
                        placeholder="india"
                      />
                      <label htmlFor="floatingInput">Address</label>
                      <span className="errors">{errors.address?.type === 'required' && "address is required"}</span>
                    </div>
                    <div className="form-floating zip">
                      <input
                        type="code"
                        className="form-control colr "
                        id="floatingPassword" name="zipcode" {...register('zipcode',{ required: true})}
                        placeholder="Code"
                      />
                      <label htmlFor="floatingPassword">ZIP-code</label>
                      <span className="errors">{errors.zipcode?.type === 'required' && "Zipcode is required"}</span>
                    </div>
                  </div>
                  <div className="condition">
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1" name="accept_checkbox"{...register('accept_checkbox',{ required: true})}
                      />
                      <label className="form-check-label " htmlFor="exampleCheck1">
                        {" "}
                        I accept the <a data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">conditions </a> and{" "}
                        <Link href="/privacy-policy"><a>privacy policy</a></Link>
                      </label>
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
                    </div><br></br>
                    </div>
                    <div className="for_required">
                    <span className="errors">{errors.accept_checkbox?.type === 'required' && "Checkbox is required"}</span>
                    </div>
                  <div className="get_offer text-center">
                    <button type="submit">
                      Get 3 offers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
    removeCookies('langSelected', { req, res});
    setCookies('langSelected', 'en', { req, res, maxAge: 60 * 6 * 24 });
    lang="en";
  }else{
    lang=langSelected.langSelected;
  }
  const [category, term] = await Promise.all([
    axios.get(`/get-categories?lang=${lang}`), 
    axios.get(`/get-static-content?lang=${lang}&slug=terms_condition`)
  ]);
  const [categories, terms] = await Promise.all([
    category.data.data, 
    term.data.data
  ]);
  return { props: { categories, terms } };
}

Requirement.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
