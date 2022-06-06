import Head from "next/head";
import Image from "next/image";
import NestedLayout from "../components/nested-layout";
import axios from "../lib/axios";
import React, {useState} from 'react';
import Link from "next/link";
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import { tenderData } from "../data/Private-tender";

export default function Tenders({tenders}) {
  console.log(tenders);
  let tenderpageData=tenderData
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
        <title>Private tenders | No Cure No Pay</title>
      </Head>

      {/*<!-- banner part start-->*/}
      <div className="requirement_banner">
        <h2 className="require_h2 text-center"> {(language=='da')?(`${tenderpageData.headingDEN}`):(`${tenderpageData.headingEN}`)}</h2>
      </div>
      {/*<!-- banner part end-->
    <!-- requirement middle body part start -->*/}
    <div className="requirement_middle_body">
        <div className="container pxx">
          <div className="all_services private_sec">
               
               <div className="requirement_decription_area text-center ">
                 <div className="tenters_details">
                   
                   <table className="table">
                       <thead>
                         <tr>
                          <th>{(language=='da')?(`${tenderpageData.titleDEN}`):(`${tenderpageData.titleEN}`)}</th>
                          <th>{(language=='da')?(`${tenderpageData.placeDEN}`):(`${tenderpageData.placeEN}`)}</th>
                          <th>{(language=='da')?(`${tenderpageData.postdateDEN}`):(`${tenderpageData.postdateEN}`)}</th>
                          <th>{(language=='da')?(`${tenderpageData.deliveryDEN}`):(`${tenderpageData.deliveryEN}`)}</th>
                          <th>{(language=='da')?(`${tenderpageData.budgetDEN}`):(`${tenderpageData.budgetEN}`)}</th>
                          <th>{(language=='da')?(`${tenderpageData.actionDEN}`):(`${tenderpageData.actionEN}`)}</th>
                         </tr>
                       </thead>
                       <tbody>
                       {tenders.data.length > 0 ?
                          tenders.data.map((tender,index)=>(
                            <tr key={index}>
                              <td data-label="Title">{tender.title}</td>
                              <td data-label="Delivery place">{tender.address}</td>
                              <td data-label="Posted date">{tender.post_date}</td>
                              <td data-label="Delivery date">{tender.deadline_date}</td>
                              <td data-label="Budget">{tender.budget} {tender.currency}</td>
                              <td data-label="Action">
                                <Link href={`/tenders/${tender.id}`}>
                                <a >{(language=='da')?(`${tenderpageData.showDEN}`):(`${tenderpageData.showEN}`)} </a> 
                                </Link>
                              </td>
                            </tr>
                          ))
                          :
                          <tr>
                            <td colSpan="6" className="text-center" data-label="Title">{tenders.msg}</td>
                            </tr>
                        }
                        
                       </tbody>
                     </table>
                     
   
   
   
   
               </div>
           </div>
          
           <div className="think_solve">
               <div className="get_offer text-center">
                   <p>{(language=='da')?(`${tenderpageData.questionDEN}`):(`${tenderpageData.questionEN}`)}</p>
                   <Link href={"/hire-a-fixer"} passHref>
                   <button className="stlbtn text_trans"> {(language=='da')?(`${tenderpageData.tenderbuttonDEN}`):(`${tenderpageData.tenderbuttonEN}`)}</button>
                   </Link>
                   <Link href={"/contact-us"} passHref>
                   <button className="stlbtn text_trans"> {(language=='da')?(`${tenderpageData.proposalbuttonDEN}`):(`${tenderpageData.proposalbuttonEN}`)}</button>
                   </Link>
               </div>
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
    setCookies('langSelected', 'da', { req, res, maxAge: 60 * 6 * 24 });
    lang="da";
  }else{
    lang=langSelected.langSelected;
  }
  const response=await axios.get(`/get-private-tenders?lang=${lang}`);
  console.log(response);
  return {
    props:{
      tenders:response.data
    }
  }
}

Tenders.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
