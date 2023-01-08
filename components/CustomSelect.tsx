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
  openContent,
  setOpenContent,
  name,
}: any) => {
  const [search, setSearch] = useState("");

  const filetedData = data.filter((item: any) =>
    item?.name?.toLowerCase().startsWith(search.toLowerCase())
  );
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        id="selectBtn"
        className={styles.select_btn}
        disabled={isDisabled}
        onClick={(e) => {
          setOpenContent(name);
        }}
      >
        <span>{selectedItem ? selectedItem.name : placeholder}</span>
        <span>
          <MdOutlineArrowDropDown />
        </span>
      </button>
      {/* To add custome select : you wil have to write first and then press Enter to select .  */}
      <div
        className={
          openContent === name ? styles.content_active : styles.content
        }
      >
        <div className={styles.search}>
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
                  setOpenContent("");
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
        <ul className={styles.options}>
          <li
            onClick={() => {
              setSelectedItem("");
              setOpenContent("");
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
                  setOpenContent("");
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
