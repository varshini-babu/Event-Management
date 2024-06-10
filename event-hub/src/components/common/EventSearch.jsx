import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const EventSearch = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setFilter(searchQuery);
    // eslint-disable-next-line react/prop-types
    const filteredEvents = data.filter((event) =>
      event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredEvents);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="event-search">
        Search events
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Type event name..."
        value={filter}
        onChange={handleSearchChange}
      />
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear
      </button>
    </div>
  );
};

export default EventSearch;
