import Head from "next/head";
import Image from "next/image";
import NestedLayout from "../../components/nested-layout";
import axios from "../../lib/axios";
import React, {useState} from 'react';
import Link from "next/link";
import { getCookies, setCookies, removeCookies } from 'cookies-next';

const page=1;
const limit=6;
export default function Blogs({blogs}) {
  console.log(blogs);
  const [page,setPage]=useState(1);
  const [Items, setItems] = useState([]);
  function loadMoreItems() {
    setIsFetching(true);

    //using axios to access the third party API
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/albums",
      params: { _page: page, _limit: 40 },
    })
      .then((res) => {
        setItems((prevTitles) => {
          return [...new Set([...prevTitles, ...res.data.map((b) => b.title)])];
        });
        setPage((prevPageNumber) => prevPageNumber + 1);
        setHasMore(res.data.length > 0);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blog List | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> Blog Post</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
    <div className=" show_deta">
        <div className="container pxx">
            <div className="all_services b_list">
            <div className="row ">
            {blogs.status == 200 ?
                blogs.data.map((blog,index)=>(
                <div className="col-md-4 col-sm-12 col-12 mb-4 mx350" key={index}>
                    <div className="for_olay">
                        <Image height="300" width="350" className="ovr_img" src={blog.blog_image} alt=""></Image>
                        <div className="mini_over_cont">
                            <p><i className="fa fa-calendar" aria-hidden="true"></i> {blog.blog_date}</p>
                            <h2>{blog.title}</h2>
                                <div className="blog_con">
                                    {/* <span className="bloger d-block" >Ashwin Rai</span>  */}
                                    <Link href={`/blogs/${blog.id}`}>
                                     <a >READ MORE</a>
                                     </Link>
                                 </div>
                        </div>
                    </div>
                </div>
                ))
                :
                <div className="text-center alert-danger">{blogs.msg}</div>
              }

            </div>
            {blogs.status == 200 ?
           <div className="load_more text-center">
               {/* <button onClick={loadMoreItems}>LOAD MORE</button> */}
           </div>
               :
               <div></div>
             }
            </div>
        </div>
    </div>

    {/* <!-- requirement middle body part end --> */}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  let langSelected=getCookies({ req, res});
  let lang="";
  if (!langSelected.langSelected){ 
    setCookies('langSelected', 'en', { req, res, maxAge: 60 * 6 * 24 });
    lang="en";
  }else{
    lang=langSelected.langSelected;
  }
  const response=await axios.get(`/get-blogs?&lang=${lang}`);
  console.log(response);
  return {
    props:{
      blogs:response.data
    }
  }
}

Blogs.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
