import {
  Button, useToast, Heading, Box, useDisclosure, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Stack, Alert, Spinner,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';
import Pagination from './Pagination';
import { DateTime } from "luxon";
import '../Styles/Search.css'

const Search = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [datalength, setDatalength] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [value, setValue] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedCapsule, setSelectedCapsule] = useState(null);

  // const openModal = (capsule) => {
  //   setSelectedCapsule(capsule);
  //   setIsModalOpen(true);
  // };

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
  }, [auth])

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
        Alert(error)
      });
  };
  const checkauth = (e) => {
    e.preventDefault();
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
          <form className="form-container" onSubmit={(e) => checkauth(e)}>
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
                <Button type='submit' colorScheme={'messenger'} className='btn-card' >
                  Submit
                </Button>

              </div>
            )}
            {selectedOption === 'status' && (
              <div className="input-container">
                <label htmlFor="status-input">Status:</label>
                <input type="text" id="original_launch-input" onChange={(e) => setValue(e.target.value)} />
                <Button type='submit' colorScheme={'messenger'} className='btn-card' >
                  Submit
                </Button>

              </div>
            )}
            {selectedOption === 'type' && (
              <div className="input-container">
                <label htmlFor="type-input">Type:</label>
                <input type="text" id="original_launch-input" onChange={(e) => setValue(e.target.value)} />
                <Button type='submit' colorScheme={'messenger'} className='btn-card' >
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
                      <div className="view-button" onClick={onOpen}>View Details</div>
                      {/* {isModalOpen && (
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
                      )
                      } */}
                      <Box>
                        <Modal isOpen={isOpen} onClose={onClose} isCentered >
                          <ModalOverlay style={{ backgroundColor: "transparent", backdropFilter: "blur(4px)", border: "1px solid red" }} />
                          <ModalContent
                            backgroundColor="white"
                            borderRadius="md"
                            boxShadow="md"
                            maxW="sm"
                            w="full"
                            zIndex="modal"
                          >
                            <ModalHeader fontWeight="bold" textAlign="center">
                              Capsule Details
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Text fontWeight="bold" mb={2}>
                                capsule_serial:- {el.capsule_serial}
                              </Text>
                              <Stack spacing={2} mb={2}>
                                <Text>
                                  Capsule_id: <span>{el.capsule_id}</span>
                                </Text>
                                <Text>
                                  Status: <span>{el.status}</span>
                                </Text>
                                <Text>
                                  Original_launch: <span>{el.original_launch}</span>
                                </Text>
                                <Text>
                                  Landings: <span>{el.landings}</span>
                                </Text>
                                <Text>
                                  Type: <span>{el.type}</span>
                                </Text>
                              </Stack>
                              <Button
                                colorScheme="blue"
                                onClick={onClose}
                                width="full"
                              >
                                Close
                              </Button>
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </Box>


                    </div>

                  )
                })
                : !auth ? "waiting for u to login..." : <Spinner />
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
    </div >
  )
}

export default Search
