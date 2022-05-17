import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Link from 'next/link';
import axios from "../lib/axios";
import ReactHtmlParser from "react-html-parser";
import { getCookies, setCookies,checkCookies, removeCookies } from 'cookies-next';

export default function Home({categories,cmss,blogs,reviews,langSelected}) {
  console.log(categories);
  console.log(cmss);
  console.log(blogs);
  console.log(reviews);
  console.log(langSelected);
  // return false;
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>No Cure No Pay</title>
      </Head>

      {/*<!-- play platform section start -->*/}
      <div className="container px-5">
        <div className="row mb-5 mt-3">
          <div className="col-md-6 col-sm-12 col-12">
            <div className="Image_bx">
              <Image
                src={cmss[0].image}
                width="716"
                height="716"
                alt=""
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-12 pt-5">
            <div className="play_text pt-5" >
            {ReactHtmlParser( cmss[1].content_body )}
            </div>
          </div>
        </div>
      </div>
      {/*<!-- play platform section end -->*/}

      {/*<!-- quotes section start -->*/}
      <div className="container">
        <div className="row">
          <div className="quote_top_section">
            <h2 className="text-center" >{ReactHtmlParser( cmss[2].content_body )}</h2>
            <p className="text-center">
            {ReactHtmlParser( cmss[3].content_body )}
            </p>
          </div>
          <div className="col-md-3 col-sm-6 col-12">
            <div className="quote_mini_box text-center">
              <Image src={cmss[4].image} width="180" height="145" alt="" />
              <h2>{ReactHtmlParser( cmss[5].content_body )}</h2>
              
              {ReactHtmlParser( cmss[6].content_body )}
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-12">
            <div className="quote_mini_box text-center">
              <Image src={cmss[7].image} width="180" height="145" alt="" />
              <h2>{ReactHtmlParser( cmss[8].content_body )}</h2>
              {ReactHtmlParser( cmss[9].content_body )}
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-12">
            <div className="quote_mini_box text-center">
              <Image
                src={cmss[10].image}
                width="180"
                height="145"
                alt=""
              />
              <h2 >{ReactHtmlParser( cmss[11].content_body )}</h2>
              {ReactHtmlParser( cmss[12].content_body )}
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-12">
            <div className="quote_mini_box text-center">
              <Image src={cmss[13].image} width="180" height="145" alt="" />
              <h2>{ReactHtmlParser( cmss[14].content_body )}</h2>
              {ReactHtmlParser( cmss[15].content_body )}
            </div>
          </div>
        </div>
      </div>

      <div className="view text-center py-5">
        <Link href="/about-us">
        <a className="stlbtn">
          Read more about the concept
        </a>
        </Link>
      </div>

      {/*<!-- quotes section end -->*/}

      {/*<!-- services section start -->*/}
      {categories.length > 0 ?
      <div className="services py-5 ">
        <div className="container">
          <div className="quote_top_section">
            <h2 className="text-center">{ReactHtmlParser( cmss[16].content_body )}</h2>
            <p className="text-center" >
            {ReactHtmlParser( cmss[17].content_body )}
            </p>
          </div>
          <div className="s_box my-5">
          {categories.map((category,index)=>(
            <div className="s_box_mini" key={index}>
              <Image
                src={category.image}
                width="100"
                height="100"
                alt=""
              />
              <h2>{category.name}</h2>
            </div>
          ))}
          </div>
          <div className="view text-center">
            <Link href="/blogs/list">
            <a className="stlbtn">
              View services we offer
            </a>
            </Link>
          </div>
        </div>
      </div>
      :
      <div>

      </div>
      }
      {/*<!-- services section end-->*/}

      <div className="container">
            <div className="row py-5">
                <div className="quote_top_section">
                    <h2 className="text-center">{ReactHtmlParser( cmss[18].content_body )}</h2>
                    <p className="text-center">{ReactHtmlParser( cmss[19].content_body )}</p>
                </div>

                <div className="col-md-3 col-sm-6 col-12 pt-2">
                    <div className="quote_mini_box text-center">
                        <Image src={cmss[20].image} width="180" height="145" alt="" />
                        <h2>{ReactHtmlParser( cmss[21].content_body )}</h2>
                        {ReactHtmlParser( cmss[22].content_body )}
                    </div>

                </div>
                <div className="col-md-3 col-sm-6 col-12 pt-2">
                    <div className="quote_mini_box text-center">
                        <Image src={cmss[23].image} width="180" height="145" alt="" />
                        <h2>{ReactHtmlParser( cmss[24].content_body )}</h2>
                        {ReactHtmlParser( cmss[25].content_body )}
                    </div>

                </div>
                <div className="col-md-3 col-sm-6 col-12 pt-2">
                    <div className="quote_mini_box text-center">
                        <Image src={cmss[26].image} width="180" height="145" alt="" />
                        <h2>{ReactHtmlParser( cmss[27].content_body )}</h2>
                        {ReactHtmlParser( cmss[28].content_body )}
                    </div>

                </div>
                <div className="col-md-3 col-sm-6 col-12 pt-2">
                    <div className="quote_mini_box text-center">
                        <Image src={cmss[29].image} width="180" height="145" alt="" />
                        <h2>{ReactHtmlParser( cmss[30].content_body )}</h2>
                        {ReactHtmlParser( cmss[31].content_body )}
                    </div>

                </div>
            </div>
        </div>

        {/*<!-- customers rate section start -->*/}

        <div className="rate_sec_main py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-12">
                        <div className="rate_mini_lmail">
                            <div className="rate_Image">
                                <Image src={cmss[32].image} width="130" height="150" alt="" />
                            </div>
                            <div className="rate_content">
                            {ReactHtmlParser( cmss[33].content_body )}
                            </div>
                        </div>
                        <div className="rate_mini_lmail">
                            <div className="rate_Image">
                                <Image src={cmss[34].image} width="130" height="150" alt="" />
                            </div>
                            <div className="rate_content">
                            {ReactHtmlParser( cmss[35].content_body )}
                            </div>
                        </div>
                        <div className="rate_mini_lmail">
                            <div className="rate_Image">
                                <Image src={cmss[36].image} width="130" height="150" alt="" />
                            </div>
                            <div className="rate_content rate_content_2">
                            {ReactHtmlParser( cmss[37].content_body )}
                            </div>
                        </div>
                        <div className="rate_mini_lmail">
                            <div className="rate_Image">
                                <Image src={cmss[38].image} width="130" height="150" alt="" />
                            </div>
                            <div className="rate_content">
                            {ReactHtmlParser( cmss[39].content_body )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12 t_color py-5 bord_radius">
                        <div className="t_monial_text">
                            <h2>{ReactHtmlParser( cmss[40].content_body )}</h2>
                            <p>
                            {[...Array(parseInt(reviews.avg_testimonials))].map((el, index) => <i className="fa fa-star" aria-hidden="true" key={index}></i>)}
                            </p>
                            <p>({parseFloat(reviews.avg_testimonials).toFixed(1)})</p>
                            <p> <strong> {reviews.count_testimonials} </strong>reviews</p>
                        </div>
                        {/*<!-- carousel item section start -->*/}
                        {reviews.status == 200 ?
                        <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                            {reviews.data.map((review,index)=>(
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index==0?"active":""} aria-current="true" aria-label={`Slide ${index}`} key={index}></button>
                            ))}
                            </div>
                            <div className="carousel-inner">
                            {reviews.data.map((review,index)=>(
                                <div className={index==0?"carousel-item active":"carousel-item"} key={index}>
                                    <div className="user_info_text">
                                        <div className="user_Image">
                                            <Image src={review.testimonial_image} width="60" height="60" alt="" />
                                        </div>
                                        <div className="user_txt">
                                            <h2>{review.name}</h2>
                                            {review.location!=null?
                                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> {review.location}</p>
                                            :""}
                                            
                                        </div>
                                    </div>
                                    <p>{review.description}</p>
                                </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev- l_btn" aria-hidden="true"><i className="fa fa-angle-left" aria-hidden="true"></i></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next- l_btn" aria-hidden="true"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                      :
                      <div></div>
                    }

                       {/* <!-- carousel item section end -->*/}
                    </div>
                </div>
            </div>
        </div>
        {/*<!-- customers rate section end -->*/}
        {/*<!-- our client and parent section start -->*/}

        <div className="cliemt_parent_sec py-5">
            <div className="container">
                <h2 className="text-center oc_partner" >{ReactHtmlParser( cmss[41].content_body )}</h2>
                <div className="row for_res">
                    <div className="col-md-2 col-sm-3 col-6 mb-2">
                        <Image  className="only_Image mb-3" src={cmss[42].image} width="120" height="55" alt="" />
                    </div>
                    <div className="col-md-2 col-sm-3 col-6 mb-2">
                        <Image className="only_Image mb-3" src={cmss[43].image} width="120" height="55" alt="" />
                    </div>
                    <div className="col-md-2 col-sm-3 col-6 mb-2">
                        <Image className="only_Image" src={cmss[44].image} width="120" height="55" alt="" />
                    </div>
                    <div className="col-md-2 col-sm-3 col-6 mb-2">
                        <Image className="only_Image" src={cmss[45].image} width="120" height="55" alt="" />
                    </div>
                    <div className="col-md-2 col-sm-3 col-6 mb-2">
                        <Image className="only_Image" src={cmss[46].image} width="120" height="55" alt="" />
                    </div>
                    <div className="col-md-2 col-sm-3 col-6 mb-2">
                        <Image className="only_Image" src={cmss[47].image} width="120" height="55" alt="" />
                    </div>
                </div>
            </div>
        </div>
        {/*<!-- our client and parent section end -->*/}

        {/*<!-- Image overlay content section start -->*/}
        <div className="container">

            <div className="quote_top_section mt-5 mb-3">
                <h2 className="text-center">{ReactHtmlParser( cmss[48].content_body )}</h2>
                <p className="text-center">{ReactHtmlParser( cmss[49].content_body )}</p>
            </div>
            <div className="overlay_main btm_spc">
                <div className="row">
                {blogs.status == 200 ?
                  blogs.data.data.map((blog,index)=>(
                  <div className="col-md-4 col-sm-12 col-12 mb-4 mx350" key={index} >
                      <div className="for_olay">
                          <Image height="300" width="350" className="ovr_img" src={blog.blog_image} alt=""></Image>
                          <div className="mini_over_cont ">
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
            </div>
        </div>
        {/*<!-- Image overlay content section end -->*/}

        {/*<!-- header top section radius section start -->*/}
        <div className="any_requirement py-5">
            <h2>{ReactHtmlParser( cmss[50].content_body )}</h2>
            <Link href="/requirement">
              <a className="cmn_btn"> Submit here</a>
              </Link>
        </div>
        {/*<!-- header top section radius section end -->*/}
        {/*<!-- footer section start -->*/}
        
        {/*<!-- footer section end -->*/}
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
  
  const [category, cms,blog,review] = await Promise.all([
    axios.get(`/get-categories?lang=${lang}&limit=5`), 
    axios.get(`/get-cms-content?lang=${lang}&slug=index_page`),
    axios.get(`/get-blogs?lang=${lang}&limit=3`),
    axios.get(`/get-reviews`)
  ]);
  const [categories, cmss,blogs,reviews] = await Promise.all([
    category.data.data, 
    cms.data.data,
    blog.data,
    review.data,
  ]);
  return { props: { categories, cmss,blogs,reviews,langSelected } };
}


Home.getLayout = function getLayout(home) {
  return (
    <Layout>
      {home}
    </Layout>
  )
}
