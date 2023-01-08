import React, { useState } from "react";
import styles from "./CustomSelect.module.css";
import { MdOutlineArrowDropDown } from "react-icons/md";

const CustomSelect = ({
  data,
  isDisabled,
  selectedItem,
  setSelectedItem,
  placeholder,
  anyInput,
}: any) => {
  const [openContent, setOpenContent] = useState(false);

  const [search, setSearch] = useState("");

  const filetedData = data.filter((item: any) =>
    item?.name?.toLowerCase().startsWith(search.toLowerCase())
  );
  return (
    <div className="wrapper">
      <button
        type="button"
        id="selectBtn"
        className="select_btn"
        disabled={isDisabled}
        onClick={(e) => {
          const actives = document.querySelectorAll(".content_active");

          actives.forEach((active) => {
            active.classList.remove("contect_active");
            active.classList.add("content");
          });

          setOpenContent(!openContent);
        }}
      >
        <span>{selectedItem ? selectedItem.name : placeholder}</span>
        <span>
          <MdOutlineArrowDropDown />
        </span>
      </button>
      {/* To add custome select : you wil have to write first and then press Enter to select .  */}
      <div className={openContent ? "content_active" : "content"}>
        <div className="search">
          {anyInput ? (
            <input
              type="text"
              placeholder="Search or Add"
              value={search}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSelectedItem({
                    id: "1",
                    name: search,
                    customeSelect: true,
                  });
                  setOpenContent(false);
                  setSearch("");
                }
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          ) : (
            <input
              spellCheck="false"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          )}
        </div>
        <ul className="options">
          <li
            onClick={() => {
              setSelectedItem("");
              setOpenContent(false);
              setSearch("");
            }}
          >
            Select an item
          </li>
          {filetedData.map((item: any) => {
            return (
              <li
                style={item.id === selectedItem.id ? { color: "green" } : {}}
                key={item.id}
                onClick={(e) => {
                  setSelectedItem(item);
                  setOpenContent(false);
                  setSearch("");
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelect;
