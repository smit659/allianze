

import './App.css';

import axios from "axios";
import {useState} from 'react';
function App() {

const [operand,setoperand]=useState(['A','B','C','D','E','F']);
const [operator,setoperator]=useState(['+','-','*','/']);
const [comparater,setcomparater]=useState(['>','<']);
const [result,setresult]=useState([{id:1,res:""}]);
const[answer_comparater,setanscomparater]=useState("");
const[rhs,setrhs]=useState("");
const onDstart=(e,item)=>{
  console.log(item);
e.dataTransfer.setData('item',item);
}

const close=(e,item,id)=>{
  setresult(result.filter(items =>{   if(  items.id!=id){ return items }}  ));
  console.log('====================================');
  console.log(result);
  console.log('====================================');
}
const handlesubmit=(e)=>{
e.preventDefault();

function handle()
{
  const data={
    one:result[1].res,
    two:result[2].res,
    three:result[3].res,
    four:answer_comparater,
    five:rhs
  }
 

  console.log(data);
  axios.post("https://smit-soni.herokuapp.com/",data).then((res)=>{
if(res){
  alert(res.data);
}
}).catch((err)=>{

});
}





handle();
}
const onDover=(e)=>{
e.preventDefault();
}
const handleDoubleClick=(e,item)=>{
 setanscomparater(item);
  
  // setresult(result.map(items =>{   if(  items==item){ return{...item,friendname:[...item.friendname,state.friendname]}}else{return item }}  ));
}
const onDrop=(e,ids)=>{
  console.log('====================================');
  console.log(e.dataTransfer.getData('item'));
  console.log('====================================');
setresult((prev)=>[...prev,{id:ids,res:(e.dataTransfer.getData('item'))}]);
}
  return (
   <div className="main">
  <div className="cards">

    {operand.map((item,i)=>(
      <div draggable   onDragStart={(e)=>{onDstart(e,item)}} className='card-style'>{item}</div>
    
    ))}
  </div>
  <div className="cards">

  {operator.map((item,i)=>(
    <div onDragStart={(e)=>{onDstart(e,item)}} draggable className='operator'>{item}</div>
    ))}
    {comparater.map((item,i)=>(
    <div onDoubleClick={(e)=>{handleDoubleClick(e,item)}} className='comparater'>{item}</div>
    ))}

      <div onClick={(e)=>{var r=prompt('What should be the rhs integer?');if(r)setrhs(r);}} className='comparater'>RHS Integer</div>
   
  </div>
  <div onDrop={(e)=>{onDrop(e,Math.random()*5)}} onDragOver={(e)=>onDover(e)} className="cards result">

  {result.map((item,i)=>(
 (item.res=='A' ||item.res=='B' ||item.res=='C' || item.res=='D' || item.res=='E' || item.res=='F') ? <div key={item.id} onDragOver={(e)=>onDover(e)}  className='card-style'>{item.res}<span onClick={(e)=>{close(e,item.res,item.id)}} className="remove" data-value="0">x</span></div>:(item.res!="")?<div onDragOver={(e)=>onDover(e)} className='operator'><span onClick={(e)=>{close(e,item.res,item.id)}} className="remove" data-value="0">x</span>{item.res}</div>:<></>
    ))}
   { (answer_comparater!="")?<div className='operator'><span onClick={()=>{setanscomparater("")}} className="remove" data-value="0">x</span>{answer_comparater}</div>:<></>}
   { (rhs!="")?<div className='rhs'><span onClick={(e)=>{setrhs("")}} className="remove" data-value="0">x</span>{rhs}</div>:<></>}
  </div>
  <div>
    <form  onSubmit={handlesubmit} method='post' action="https://smit-soni.herokuapp.com/"  >
  {/* {(result[1]) ? <input type="hidden" name="one" value={result[1].res}></input>:<></>}
  {(result[2]) ?   <input type="hidden" name="two" value={result[2].res}></input>:<></>}
  {(result[3]) ? <input type="hidden" name="three" value={result[3].res}></input>:<></>}
  {(answer_comparater!="") ?  <input type="hidden" name="four" value={answer_comparater}></input>:<></>}
  {(rhs!="") ?  <input type="hidden" name="five" value={rhs}></input>:<></>} */}
   <button className="evaluate-btn" type="submit" >Evaluate</button>
    </form>
  </div>

   </div>
  );
}

export default App;
