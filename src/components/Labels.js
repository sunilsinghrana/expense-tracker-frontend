import React from 'react';
import {default as api} from '../store/apiSlice'
import { getLabels } from '../helper/helper';

function LabelComponent({data}){
  if(!data)return <></>
  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div className='w-2 h-2 rounded py-3 ' style={{background: data.color ?? "#f9c74f"}}> </div>
        <h3 className='text-md'>{data.type ?? ""}</h3>
      </div>
      <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
    </div>
  )
}

const Labels = () => {

 const {data, isFetching, isError, isSuccess} = api.useGetLabelsQuery()
 let transaction ;
 
 if(isFetching){
   transaction = <div>Fetching</div>
  }else if(isSuccess){
 transaction = getLabels(data, 'type').map((v,i)=><LabelComponent key={i} data={v}/>)
 }else if(isError){
   transaction = <div>Error</div>
  }


  return (
    <>
    {transaction}
    </>
  )
}

export default Labels
