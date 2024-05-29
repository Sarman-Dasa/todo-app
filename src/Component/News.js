import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import NewsItem from "./NewsItem";
import "../css/news.css";
import DatePicker from "react-multi-date-picker";
import MyPagination from "./MyPagination";

axios.defaults.baseURL = "https://newsapi.org/v2/";
axios.defaults.headers.common["Authorization"] =
  "834a9effc91a4a7198aa0e4f714008cf";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function News() {
  const [newsList, setNewsList] = useState();
  const [perPage, setPerPage] = useState(5);
  const perPageOption = [5, 10, 15, 20];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dateFilter, setDateFilter] = useState([]);
  const [category, setCategory] = useState('business');
  let startDate = null;
  let endDate = null;
  const categoryOption = [
    {
      value: "business",
      label: "Business",
    },
    {
      value: "entertainment",
      label: "Entertainment",
    },
    {
      value: "general",
      label: "General",
    },
    {
      value: "technology",
      label: "Technology",
    },
  ];

  async function getNewsData() {
    await axios({
      method: "get",
      url: `top-headlines?country=in&page=${currentPage}&pageSize=${perPage}&from=${startDate}&to=${endDate}&category=${
        category
      }`,
      responseType: "stream",
    })
      .then(function (response) {
        let data = JSON.parse(response.data);
        setTotalCount(data.totalResults);
        setNewsList(data.articles);
      })
      .catch((e) => {
        console.error("e", e);
      });
  }

  useEffect(() => {
    applyFilter();
  },[perPage]);

  // Set Current page value
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(() => {
      getNewsData();
    }, 200);
  };

  function applyFilter() {
    if (dateFilter && dateFilter[0] && dateFilter[1]) {
      startDate = dateFilter[0].format();
      endDate = dateFilter[1].format();
    }
    getNewsData();
  }

  function clearFilter() {
    setCurrentPage(1);
    setPerPage(5);
    setDateFilter([null, null]);
    applyFilter();
  }
  return (
    <div>
      <Container>
        <div className="d-flex justify-content-between align-items-center sticky-header ">
          <div className="d-flex align-items-center">
            <span className="filter">Filter</span>

            {/* PerPage Filter */}
            <Form.Select
              size="sm"
              onChange={(e) => setPerPage(e.target.value)}
              value={perPage}
              className="mx-2"
            >
              {perPageOption.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>

            {/* Date Filter */}
            <DatePicker
              value={dateFilter}
              onChange={setDateFilter}
              dateSeparator=" to "
              range
              rangeHover
              containerClassName="date-select mx-2"
              placeholder="Select Date"
            />

            {/* category Filter */}
            <Select
              options={categoryOption}
              defaultValue={categoryOption[0]}
              className="sort-by"
              onChange={(e)=>setCategory(e.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <Button className="mx-2" onClick={applyFilter}>
              Apply
            </Button>
            <Button className="mx-2" onClick={clearFilter}>
              Clear
            </Button>
          </div>
        </div>

        <div className="row">
          {newsList &&
            newsList.map((item, index) => {
              return (
                <div className="col-md-6 col-lg-4 mb-4" key={index}>
                  <NewsItem data={item} />
                </div>
              );
            })}

          <MyPagination
            totalCount={totalCount}
            perPage={perPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </Container>
    </div>
  );
}
