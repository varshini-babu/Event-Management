import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export const EventFilter = ({data,setFilteredData}) => {
    const[filter,setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedEventName = e.target.value;
        setFilter(selectedEventName)
        // eslint-disable-next-line react/prop-types
        const filteredEvents = data.filter((event) => 
            event.eventName.toLowerCase()
        .includes(selectedEventName.toLowerCase()))
        setFilteredData(filteredEvents)
    }
    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    // eslint-disable-next-line react/prop-types
    const eventNames = ["",...new Set(data.map((event) => event.eventName))]

  return (
    <div className='input-group mb-3'>
        <span className="input-group-text" id="event-name-filter">
				Filter events
			</span>
			<select
				className="form-select"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">select a event name to filter....</option>
				{eventNames.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
    </div>
  )
}

