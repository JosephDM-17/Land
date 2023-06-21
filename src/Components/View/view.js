import React,{useEffect,useState,createContext} from 'react';
import land from '../../assets/landimg.jpg'
import './view.css';
function View() {
  const [userDetails,setUserDetails]=useState()

//   useEffect(() => {
//     const {userId}=postDetails
//     firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
//       res.forEach(doc=>{
//         setUserDetails(doc.data())
//       });
//     })
  
   
//   },[])
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={land}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; 20 ETH </p>
          <span>Ernakulam</span>
          <p>70 Cent</p>
          <span>IsAvailabe </span>
        </div>
        {/* {userDetails &&  */}
        <div className="contactDetails">
          <p>Seller details</p>
          <p>John</p>
          <p>8526479</p>
        </div>
        {/* } */}
        <div>
            <button className='ml-6 px-6 py-2 mt-6 w-96 text-xl rounded-md bg-opacity-0 text-black border-2 border-slate-500 hover:bg-black
          hover:text-white hover:border-black transition duration-300 ease-in-out'> Buy</button>
        </div>
      </div>
    </div>
  );
}
export default View;