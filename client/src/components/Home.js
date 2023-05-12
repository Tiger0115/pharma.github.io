import React,{useState} from 'react'
import axios from 'axios'
import StockAlert from './StockAlert';
// import Navbar from './Navbar'

export default function Home() {

  const [mName, setmName]= useState("");
  const [uid, setUid]= useState(0);
  const [disease, setDisease]= useState("");
  const [cpu, setCpu]= useState(0.0);
  const [stock, setstock]= useState(0);
  const [allergy, setAllergy]= useState("");
  const [sellStock,setSellStock]=useState(0);

  const [list, setList]= useState([])
  const [data,setData]=useState([])
  const [sellMed, setSellMed] = useState([])
  let arr=[];

    const getMed=()=>{
       
       axios.post('http://localhost:8000/medicine/bill', {mName,sellStock})
      .then(res=>{
        // console.log(res);        
        setUid(res.data.uid);
        setDisease(res.data.disease);
        setCpu(res.data.costPerUnit);
        setstock(res.data.incomingStock);
        setAllergy(res.allergyWarning);         
      })
      .catch(err => console.error(err));
    }
  

  const addItem=()=>{
    setSellMed(arr);
       axios.post('http://localhost:8000/medicine/bill', {mName,sellStock})
      .then(res=>{
        // console.log(res);        
        setUid(res.data.uid);
        setDisease(res.data.disease);
        setCpu(res.data.costPerUnit);
        setstock(res.data.incomingStock);
        setAllergy(res.allergyWarning);         
      })
      .catch(err => console.error(err));
    
    
    if(sellStock>stock)
    {
      alert("Stock Low");
    }
    else
    {
      let temp={
        "mName": mName,
        "uid": uid,
        "cpu": cpu,
        "stock": sellStock
      }
      arr.push(temp)
      alert("Medicine Added Successfully")
      setSellMed(arr)
     
    }
  }

  // const checkQuantity=(event)=>{
  //   setSellStock(event.target.value)
  //   if(uid===0)
  //   {
  //     alert("Medicine Name Not Found")
  //   }
  //   else if(sellStock>stock)
  //   {
  //     alert("Quantity more than stock");
  //   }    
  // }

  return (
    <>
        {/* <Navbar/> */}
        <center>
        <div className='container my-5'>
            <table className='table table-bordered border-primary'>
              <thead>
              <tr>
                  
                  <th>Med Name</th>
                  <th>UID</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
              </tr>
              </thead>

             
              {sellMed.map((med, index)=>(                 
                   <tbody>
                  <tr key={index}>
                      <td>{med.mName}</td>
                      <td>{med.uid}</td>
                      <td>{med.stock}</td>
                      <td>{med.cpu}</td>                       
                      
                      <td>{med.stock * med.cpu}</td>
                  </tr></tbody>
                ))
              }
              

            </table>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text" id="inputGroup-sizing-sm">Medicine Name</span>
              <input type="text" value={mName} class="form-control" onChange={(e) => setmName(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>

              <span class="input-group-text" id="inputGroup-sizing-sm">Quantity</span>
              <input type="number" value={sellStock} class="form-control" onChange={(e) => setSellStock(e.target.value)}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
              <button type="button" class="btn btn-primary" onClick={addItem}>+ Add Medicine</button>
            </div>
            <button type="button" class="btn btn-primary" onClick={getMed}>Complete Order</button>
        </div>
        </center>
    </>
  )
}