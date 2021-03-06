import { useRouter } from 'next/router'
import Head from "next/head";
import Image from "next/image";
import NestedLayout from "../../components/nested-navbar";
import axios from "../../lib/axios";
import Footer from "../../components/footer";
import React, { useState } from 'react';
import Link from "next/link";
import { tenderData } from '../../data/Private-tender';
export default function MyData({ tenders }) {
  const router = useRouter()
  const { pageno } = router.query
  console.log(tenders);
  let tenderpageData=tenderData
  let myLan
 
  if (typeof window !== 'undefined') {
    myLan = localStorage.getItem('language')
  }
  const [language, setLanguage] = useState(myLan || 'da')
  return(
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Private tenders details of {tenders.data.title} |{tenders.data.budget} {tenders.data.currency} | No Cure No Pay </title>
      </Head>
      <NestedLayout></NestedLayout>
      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> {(language=='da')?(`${tenderpageData.detailsDEN}`):(`${tenderpageData.detailsEN}`)}</h2>
      </div>
      {/*<!-- banner part end-->*/}
      {/*<!-- requirement middle body part start -->*/}
      <div style={{ position: 'relative', top: '-70px' }} className=" show_deta">
        <div className="container pxx private_td">
          <div className="all_services">

            <div className="requirement_decription_area  ">
              <div className="main_detail_box my-3">
                <div className="details_box d-flex">
                  <label htmlFor="">{(language=='da')?(`${tenderpageData.titleDEN}`):(`${tenderpageData.titleEN}`)} :-</label>
                  <p>{tenders.data.title}</p>
                </div>

              </div>
              <div className="details_box d-flex my-3">
                <label htmlFor="">{(language=='da')?(`${tenderpageData.descriptionDEN}`):(`${tenderpageData.descriptionEN}`)} :- </label>
                <p> {tenders.data.description} </p>
              </div>

              <div className="main_detail_box my-3">
                <div className="details_box d-flex">
                  <label htmlFor="">{(language=='da')?(`${tenderpageData.deliveryDEN}`):(`${tenderpageData.deliveryEN}`)} :-</label>
                  <p> {tenders.data.deadline_date}</p>
                </div>
                <div className="details_box right_data d-flex">
                  <label htmlFor="">{(language=='da')?(`${tenderpageData.budgetDEN}`):(`${tenderpageData.budgetEN}`)} :-</label>
                  <p> {tenders.data.budget} {tenders.data.currency}</p>
                </div>
              </div>
              {/* <div className="main_detail_box my-3">
                    <div className="details_box d-flex">
                        <label htmlFor="">Phone :-</label>
                        <p> {tenders.data.phone}</p>
                    </div>
                    <div className="details_box right_data d-flex">
                        <label htmlFor="">E-mail :-</label>
                        <p> {tenders.data.email}</p>
                    </div>
                 </div>
                 <div className="details_box d-flex my-3">
                    <label htmlFor="">Name :-</label>
                    <p> {tenders.data.name}</p>
                </div> */}
              <div className="main_detail_box my-3">
                <div className="details_box d-flex">
                  <label htmlFor="">{(language=='da')?(`${tenderpageData.placeDEN}`):(`${tenderpageData.placeEN}`)} :-</label>
                  <p>  {tenders.data.address} </p>
                </div>
                <div className="details_box right_data d-flex">
                  <label htmlFor="">{(language=='da')?(`${tenderpageData.zipcodeDEN}`):(`${tenderpageData.zipcodeEN}`)} :-</label>
                  <p> {tenders.data.zipcode}</p>
                </div>
              </div>
              {/* <div className="details_box d-flex align-items-center mt3">
                    <label htmlFor="">Image Preview :-</label>
                    <p>
                    {tenders.data.files.map((file,index)=>(
                      <Image
                          src={file.image}
                          width={100}
                          height={100}
                          alt="" key={index}
                        />
                    ))}
                   </p>
                </div> */}
            </div>

            <div className="think_solve">
              <div className="get_offer text-center">
                <p>{(language=='da')?(`${tenderpageData.questionDEN}`):(`${tenderpageData.questionEN}`)}</p>
                <Link href={"/contact-us"} passHref>
                  <button className="stlbtn text_trans"> {(language=='da')?(`${tenderpageData.proposalbuttonDEN}`):(`${tenderpageData.proposalbuttonEN}`)}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- requirement middle body part end -->*/}
      <Footer></Footer>
    </>
  )
}

// export async function getStaticPaths() {
//   const response = await axios.get('/get-private-tenders?lang=en');
//   console.log(response);
//   const paths = response.data.data.map((curElem) => {
//     return {
//       params: {
//         pageno: curElem.id.toString(),
//       }
//     }
//   })
//   return {
//     paths,
//     fallback: false, // See the "fallback" section below
//   };
// }



// export const getStaticProps = async (context) => {
 
// }
// myData.getInitialProps = async (ctx) => {
//   console.log('ctx')
//   const id = ctx.params?.pageno;
//   const response = await axios.get(`/get-private-tenders-details/${id}?lang=en`);
//   console.log(response);
//   return {
//     props: {
//       tenders: response.data
//     }
//   }
// }


export async function getServerSideProps(context) {
  const id = context.params?.pageno;
  const response = await axios.get(`/get-private-tenders-details/${id}?lang=en`);
  return {
    props: {
      tenders: response.data
    }, // will be passed to the page component as props
  }
}