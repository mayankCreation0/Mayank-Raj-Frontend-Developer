import { Button, useToast ,Heading } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import Pagination from './Pagination';
import { DateTime } from "luxon";
import '../Styles/Search.css'

const Search = () => {
  const toast = useToast();
  const { auth } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [datalength, setDatalength] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const openModal = (capsule) => {
    setSelectedCapsule(capsule);
    setIsModalOpen(true);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const display = async () => {
    try {
      const res = await fetch('https://api.spacexdata.com/v3/capsules')
      const data = await res.json();

      setData(data)
      setDatalength(data.length);

    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    display();
  }, [])

  const datetime = (e) => {
    let utcDateString = DateTime.fromISO(e.target.value, { zone: "utc" });
    utcDateString = utcDateString.toISO();
    setValue(utcDateString)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = `https://api.spacexdata.com/v3/capsules?${selectedOption}=${value}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {



        setData(data);
        setDatalength(data.length);
      })
      .catch((error) => {

      });
  };
  const checkauth = (e) => {
    if (auth) {
      handleSubmit(e);
    }
    else {
      toast({
        title: "Unauthorised user!! Login first",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    }
  }
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const paginateData = data.slice(firstPostIndex, lastPostIndex);
  return (
    <div id="search">
      <Heading>Search</Heading>
      <>
        <div className='capsule-container'>
          <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="select-option">Filter by:</label>
            <select id="select-option" value={selectedOption} onChange={handleSelectChange}>
              <option value="">--Select an option--</option>
              <option value="type">Type</option>
              <option value="status">Status</option>
              <option value="original_launch">original_launch</option>
            </select>

            {selectedOption === 'original_launch' && (
              <div className="input-container">
                <label htmlFor="original_launch-input">Launch Date:</label>
                <input type="datetime-local" id="original_launch-input" onChange={(e) => datetime(e)} />
                <Button type='submit' colorScheme={'messenger'} className='btn-card' onClick={(e)=>checkauth(e)}>
                  Submit
                </Button>

              </div>
            )}
            {selectedOption === 'status' && (
              <div className="input-container">
                <label htmlFor="status-input">Status:</label>
                <input type="text" id="original_launch-input" onChange={(e) => setValue(e.target.value)} />
                <Button type='submit' colorScheme={'messenger'} className='btn-card' onClick={(e) => checkauth(e)}>
                  Submit
                </Button>

              </div>
            )}
            {selectedOption === 'type' && (
              <div className="input-container">
                <label htmlFor="type-input">Type:</label>
                <input type="text" id="original_launch-input" onChange={(e) => setValue(e.target.value)} />
                <Button type='submit' colorScheme={'messenger'} className='btn-card' onClick={(e) => checkauth(e)}>
                  Submit
                </Button>

              </div>
            )}
          </form>

          <div className='capsules-card-container'>

            <div className='capsules-card'>
              {paginateData.length > 0 ?
                paginateData.map((el, i) => {
                  return (
                    <div className='card' key={i}>
                      <h2>{el.capsule_serial}</h2>
                      <p>Capsule_id: {el.capsule_id}</p>
                      <p>Status: {el.status}</p>
                      <p>Original_launch: {el.original_launch}</p>
                      <p>Landings: {el.landings}</p>
                      <p>Type: {el.type}</p>
                      <div className="view-button" onClick={() => openModal(true)}>View Details</div>
                      {isModalOpen && (
                        <div className="modal">
                          <div className="modal-content">
                            <span className="modal-close" onClick={() => setIsModalOpen(false)}>
                              &times;
                            </span>
                            {selectedCapsule && (
                              <>
                                <div className="modal-title">{selectedCapsule.capsule_serial}</div>
                                <div className="modal-body">
                                  <p>Capsule_id: {selectedCapsule.capsule_id}</p>
                                  <p>Status: {selectedCapsule.status}</p>
                                  <p>Original_launch: {selectedCapsule.original_launch}</p>
                                  <p>Landings: {selectedCapsule.landings}</p>
                                  <p>Type: {selectedCapsule.type}</p>
                                </div>
                                <div className="modal-footer">
                                  <button onClick={() => setIsModalOpen(false)}>Close</button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                    </div>

                  )
                })
                : !auth ?  "waiting for u to login..." : "Loading..."
              }
            </div>
          </div>

        </div>
        <Pagination
          totalPosts={datalength}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </>
    </div>
  )
}

export default Search
