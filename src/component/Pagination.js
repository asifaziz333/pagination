import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './pagination.css'
const Pagination = () => {
  const[tableData,setTableData]=useState([])
  const[currentPage,setCurrentPage]=useState(1);
  const[postsPerPage]=useState(10);
  const lastIndex=currentPage*postsPerPage;
  const firstIndex=lastIndex-postsPerPage;
  const currentData=tableData?.users?.slice(firstIndex,lastIndex)
  const totalPage=Math.ceil(tableData?.total/postsPerPage)

console.log(totalPage);
const prev=()=>{
  setCurrentPage(Math.max(currentPage-1,1))
}
const next=()=>{
  setCurrentPage(Math.min(currentPage+1,totalPage))
  }
  const jump=(index)=>{
    setCurrentPage(index)
  }

  const getData=async()=>{
    const data=await axios.get("https://dummyjson.com/users?limit=0");
    console.log(data.data.total); 
    setTableData(data?.data);
  }
  useEffect(()=>{
    getData();
  },[])
      return (
    <div className="App">
      <h2>Pagination</h2>
  <table className='table'>
    <thead>
      <tr>
        <th>id</th>
        <th>firstName</th>
        <th>Email</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
    {
    currentData?.map((item,index)=>{
      return(
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.email}</td>
          <td>{item.gender}</td>
          </tr>
          )
          })
  }
    </tbody>
  </table>
  <div className='pagination'>
 <button onClick={prev} disabled={currentPage==1}>Prev</button>
{Array.from({length:totalPage},(_,index)=>(
  <button onClick={()=>jump(index+1)} className={index+1==currentPage?"active":""}>{index+1}</button>
))}
 <button onClick={next} disabled={currentPage==totalPage}>Next</button>
 </div>
    </div>
  );
 
}

export default Pagination
