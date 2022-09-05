import React, { useEffect, useState } from "react";
import "./index.scss";
//https://6314fc585b85ba9b11dae920.mockapi.io/colection
import { Collection } from "./Collection";

const carts = [
  { name: "Leonard Christiansen" },
  { name: "Kenny Harber" },
  { name: "Janie Moen DVM" },
  { name: "Sheldon Upton" },
  { name: "Kari Pagac" },
  { name: "Dr. Juanita Cormier" },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const category = categoryId ? `category=${categoryId}` : "";

    setIsLoading(true);
    fetch(
      `https://6314fc585b85ba9b11dae920.mockapi.io/colection?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollection(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Can't download photo");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {carts.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId == i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2> Waiting...</h2>
        ) : (
          collection
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.avatar} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((e, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page == i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
