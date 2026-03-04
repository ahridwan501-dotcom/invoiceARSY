"use client";
import { useState } from "react";

const formatRupiah = (value: number | string) => {
  const number = Number(value || 0);
  return number.toLocaleString("id-ID");
};

const parseNumber = (value) => {
  // hapus semua selain angka
  return value.replace(/[^\d]/g, "");
};
export default function Home(){
  const customerHistory = [
"ONIISAN GALAXY",
"ONIISAN TAMBUN",
"ONIISAN PONDOK KELAPA",
"KATSUIN SALEMBA",
"KATSUIN HARAPAN INDAH",
"ONIISAN JATIWARINGIN",
"SHRIMP WINGS",
"GOWASH",
"SABUN CUCI PIRING 5 LITER",
"UDANG KUPAS 5KG"
];
const inputStyle = {
  padding: "10px",
  border: "1px solid #000000ff",
  borderRadius: "6px",
  background: "#fff",
  color: "#000000ff",            // teks benar-benar hitam
  outline: "none",
  fontSize: "14px",
  width: "100%",
  fontWeight: "500"
};
const [company,setCompany] = useState("")
const [from,setFrom] = useState("")
const [billTo,setBillTo] = useState("")
const [invoiceNumber,setInvoiceNumber] = useState("1")
const [invoiceDate,setInvoiceDate] = useState("")

const [items,setItems] = useState([
{description:"",qty:1,price:0}
])

const [generated,setGenerated] = useState(false)

const addItem=()=>{
setItems([...items,{description:"",qty:1,price:0}])
}

const updateItem=(i,field,value)=>{
const newItems=[...items]
newItems[i][field]=value
setItems(newItems)
}

const subtotal=items.reduce((acc,item)=>acc+(item.qty*item.price),0)
const tax = 0
const total = subtotal

if(generated){

return(

<div style={{background:"#f4f6f8",padding:"40px",fontFamily:"Arial"}}>

<div style={{
maxWidth:"900px",
margin:"auto",
background:"white",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
color:"#111"
}}>

<div style={{background:"#3f72b5",color:"white",padding:"18px 30px",display:"flex",justifyContent:"space-between",fontWeight:"bold",fontSize:"22px"}}>
<span>{company || "MY COMPANY"}</span>
<span>INVOICE</span>
</div>

<div style={{display:"flex",justifyContent:"space-between",padding:"30px 40px"}}>

<div>
<b>Bill To</b>
<p>{billTo}</p>
</div>

<div style={{textAlign:"right"}}>
<p><b>Invoice #</b> {invoiceNumber}</p>
<p><b>Date</b> {invoiceDate}</p>
</div>

</div>

<table style={{
width:"calc(100% - 80px)",
margin:"0 40px",
borderCollapse:"collapse",
border:"2px solid #bbb"
}}>

<thead>

<tr style={{background:"#f2f2f2",fontWeight:"700",color:"#222"}}>

<th style={{
border:"2px solid #bbb",
padding:"12px",
textAlign:"left",
fontWeight:"700",
color:"#222"
}}>DESCRIPTION</th>
<th style={{border:"1px solid #ccc",padding:"10px"}}>QTY</th>
<th style={{border:"1px solid #ccc",padding:"10px"}}>PRICE</th>
<th style={{border:"1px solid #ccc",padding:"10px"}}>AMOUNT</th>

</tr>

</thead>

<tbody>

{items.map((item,i)=>{

const amount=item.qty*item.price

return(

<tr key={i}>
<td style={{
border:"2px solid #ddd",
padding:"12px",
color:"#222",
fontWeight:"500"
}}>{item.description}</td>
<td style={{border:"1px solid #ddd",padding:"10px",textAlign:"center"}}>{item.qty}</td>
<td style={{border:"1px solid #ddd",padding:"10px",textAlign:"right"}}>
Rp {Number(item.price).toLocaleString("id-ID")}
</td>
<td style={{border:"1px solid #ddd",padding:"10px",textAlign:"right"}}>
Rp {Number(amount).toLocaleString("id-ID")}
</td>
</tr>
)

})}

</tbody>

</table>

<div style={{display:"flex",justifyContent:"flex-end",padding:"30px 40px"}}>

<div>

<p style={{fontWeight:"600"}}>
Subtotal : Rp {subtotal.toLocaleString("id-ID")}
</p>
<h2 style={{fontWeight:"700"}}>
Total : Rp {total.toLocaleString("id-ID")}
</h2>

</div>

</div>

<div style={{textAlign:"center",paddingBottom:"40px"}}>

<button onClick={()=>window.print()} style={{padding:"12px 30px",background:"#3f72b5",color:"white",border:"none",borderRadius:"6px"}}>
Print Invoice </button>

</div>

</div>

</div>

)

}

return(

<div style={{background:"#ffffffff",minHeight:"100vh",padding:"40px",fontFamily:"Arial"}}>

<div style={{maxWidth:"900px",margin:"auto",background:"white",padding:"40px",boxShadow:"0 4px 15px rgba(0,0,0,0.1)"}}>

<h2 style={{fontWeight:"700",color:"#222"}}>
Create Invoice
</h2>

<input
placeholder="Company Name"
value={company}
onChange={(e)=>setCompany(e.target.value)}
style={{
...inputStyle,
marginBottom:"20px"
}}
/>
<textarea
placeholder="From"
value={from}
onChange={(e)=>setFrom(e.target.value)}
style={{
...inputStyle,
marginBottom:"20px",
minHeight:"80px"
}}
/>

<input
list="customerList"
placeholder="Bill To"
value={billTo}
onChange={(e)=>setBillTo(e.target.value)}
style={{
...inputStyle,
marginBottom:"20px"
}}
/>

<datalist id="customerList">
{customerHistory.map((c,i)=>(
<option key={i} value={c} />
))}
</datalist>

<div style={{display:"flex",gap:"20px",marginBottom:"20px"}}>

<input
placeholder="Invoice #"
value={invoiceNumber}
onChange={(e)=>setInvoiceNumber(e.target.value)}
style={{...inputStyle,width:"150px"}}
/>

<input
type="date"
value={invoiceDate}
onChange={(e)=>setInvoiceDate(e.target.value)}
style={{...inputStyle,width:"180px"}}
/>

</div>

<h3 style={{fontWeight:"600",color:"#222"}}>
Items
</h3>

{items.map((item,i)=>(
<div key={i} style={{display:"flex",gap:"10px",marginBottom:"10px"}}>

<input
placeholder="Description"
value={item.description}
onChange={(e)=>updateItem(i,"description",e.target.value)}
style={{...inputStyle,flex:3}}
/>

<input
type="number"
placeholder="Qty"
value={item.qty}
onChange={(e)=>updateItem(i,"qty",e.target.value)}
style={{...inputStyle,width:"80px"}}
/>

<input
placeholder="Price"
value={formatRupiah(item.price)}
onChange={(e)=>{
  const raw = parseNumber(e.target.value);
  updateItem(i,"price", raw);
}}
style={{...inputStyle,width:"120px"}}
/>

</div>
))}

<button
onClick={addItem}
style={{
marginBottom:"20px",
fontWeight:"600",
color:"#333"
}}
>
+ Add Item
</button>

<h3 style={{fontWeight:"700",color:"#222"}}>
Total Rp {total.toLocaleString("id-ID")}
</h3>

<button onClick={()=>setGenerated(true)} style={{padding:"12px 30px",background:"#3f72b5",color:"white",border:"none",borderRadius:"6px"}}>
Generate Invoice
</button>

</div>

</div>

)

}
