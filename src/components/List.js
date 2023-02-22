import React from 'react';
import 'boxicons';
import {default as api} from '../store/apiSlice';

const List = () => {
  const {data, isFetching, isError, isSuccess} = api.useGetLabelsQuery()
  const [deleteTransaction] = api.useDeleteTransactionMutation()
  let transaction ;

  const handlerClick = (e)=>{
    if(!e.target.dataset.id) return 0;
    deleteTransaction({_id: e.target.dataset.id})
  }
 
  if(isFetching){
   transaction = <div>Fetching</div>
  }else if(isSuccess){
  transaction = data.map((v,i)=><Transaction key={i} category={v} handler={handlerClick} />)
  }else if(isError){
    transaction = <div>Error</div>
   }


  return (
    <div className='flex flex-col py-6 gap-3 '>
      <h1 className='py-4 font-bold text-xl'>History</h1>
      {transaction}
    </div>
  )
}

export default List

function Transaction({category, handler}){
    if(!category) return null;
    return(
        <div className='item flex justify-center bg-gray-50 py-2 rounded-r' style={{borderRight: `8px solid ${category.color ?? "#e5e5e5"}`}}>
            <button className='px-3' onClick={handler}><box-icon data-id={category._id ?? ""} size="15px" color={category.color ?? "#e5e5e5"} name="trash"></box-icon></button>
            <span className='block w-full'>{category.name ?? ""}</span>
        </div>
    )
} 
