import Head from "next/head";
import Image from "next/image";
import NestedLayout from "../../components/nested-navbar";
import axios from "../../lib/axios";
import Footer from "../../components/footer";

import React, {useState} from 'react';
import Link from "next/link";

const page=1;
const limit=6;
export default function myData({blog}) {
  console.log(blog);
  return (
    <>
    <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog details | No Cure No Pay</title>
      </Head>
<NestedLayout></NestedLayout>
      {/*<!-- banner part start-->*/}
      <div className="blog_banner details_banner" style={{backgroundImage: `url(${blog.data.blog_image})`}}>
      <h2 className="require_h2 text-center">{blog.data.title}</h2>
      <div className="blog_over"></div>
    </div>
      {/*<!-- banner part end-->*/}
    {/*<!-- requirement middle body part start -->*/}
    <div className=" show_deta">
        <div className="container pxx">
            <div className="all_services">
               <div className="row">
                   <div className="col-md-8 col-sm-12 col-12">
                       <div className="left_detail">
                          <img src={blog.data.blog_image} height="300px" width="100%"></img>
                          <div dangerouslySetInnerHTML={{ __html: blog.data.description }}>
                            
                          </div>
                       </div>
                   </div>
                   <div className="col-md-4 col-sm-12 col-12">
                     {blog.recents.length > 0 ?
                       blog.recents.map((recent,index)=>(
                       <div className="right_details" key={index}>
                        {index==0? 
                       <h3>RECENT POST</h3>
                       :""}
                       <div className="right_txt_bx">
                       <p><i className="fa fa-angle-right" aria-hidden="true"></i> </p> <p>{recent.title}</p>
                    </div>
                       <span>{recent.blog_date}</span>
                       
                       </div>
                       ))
                       :
                       <div className="right_details">
                         <h3>RECENT POST</h3>
                         <div className="text-center alert-danger">No blog found.</div>
                       </div>
                     }

                      
                   </div>
               </div>

               
            </div>
        </div>
    </div>
      {/*<!-- requirement middle body part end -->*/}
      <Footer></Footer>
    </>
  );
}

export async function getStaticPaths() {
  const response=await axios.get(`/get-blogs?lang=en`);
  console.log(response);
  const paths=response.data.data.map((curElem)=>{
    return {
      params:{
        pageno:curElem.id.toString(),
      }
    }
  })
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export const getStaticProps = async (context) =>{
  const id=context.params.pageno;
  const response=await axios.get(`/get-blog-details/${id}`);
  console.log(response);
  return {
    props:{
      blog:response.data
    }
  }
}

// myData.getLayout = function getLayout(page) {
//   return <NestedLayout>{page}</NestedLayout>;
// };