import {useEffect, useState} from 'react'
import { getEventNames } from '../utils/ApiFunctions'

export const EventNameSelector = ({handleEventInputChange, newEvent}) => {

    const[eventName,setEventName] = useState([""])
    const[showNewEventNameInput,setShowNewEventNameInput] = useState(false)
    const[newEventName,setNewEventName] = useState("")

    useEffect(()=>{
        getEventNames().then((data)=>{
            setEventName(data)
        })
    },[])

    const handleNewEventNameInputChange = (e) => {
        setNewEventName(e.target.value)
    }

    const handleAddNewEventName = () =>{
        if(newEventName !== ""){
            setEventName([...eventName,newEventName])
            setNewEventName("")
            setShowNewEventNameInput(false)
        }
    }

  return (
    <>
    
    {eventName.length > 0 && (
        <div>
            <select
            className='form-select'
            id='event_name'
            required
            name='event_name'
            onChange={(e) =>{
                if(e.target.value === "Add New"){
                    setShowNewEventNameInput(true)
                }else{
                    handleEventInputChange(e)
                }
            }}>
                <option value={""}>Select a event</option>
                <option value={"Add New"}>Add New</option>
                {eventName.map((type,index)=>(
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            {showNewEventNameInput && (
                <div className='input-group'>
                    <input
                    className='form-control'
                    type='text'
                    placeholder='Enter a new event'
                    onChange={handleNewEventNameInputChange}/>
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewEventName}>Add</button>
                    </div>
            )}
        </div>
    )}

    </>
  )
}
