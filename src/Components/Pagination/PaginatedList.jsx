import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaginationList.css";

const PaginatedList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totaldata, SetTotalData] = useState(5);

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://contact-management-server-sl06.onrender.com/contact",
        {
          params: {
            page: currentPage,
            limit,
          },
        }
      );

      setContacts(response.data.data.contacts);
      setTotalPages(response.data.data.totalPages);
      SetTotalData(response.data.data.totalContacts);
    };

    fetchData().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [limit, currentPage]);

  const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className="data">
        <h1>Paginated List</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>tag</th>
                <th>source</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.tag}</td>
                  <td>{contact.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pages">
        <div className="indexofpages">
          {/* Pagination buttons */}
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>
            {currentPage}-{totalPages}
          </span>
          <button onClick={() => changePage(currentPage + 1)}>&gt;</button>
        </div>
        <div className="contactsperpage">
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
          >
            {[5, 10, 15, 20].map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default PaginatedList;
