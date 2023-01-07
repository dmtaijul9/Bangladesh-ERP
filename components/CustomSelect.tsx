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

  const filetedData = data.filter((item) =>
    item?.name?.toLowerCase().startsWith(search)
  );
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.select_btn}
        disabled={isDisabled}
        onClick={() => {
          setOpenContent(!openContent);
        }}
      >
        <span>{selectedItem ? selectedItem.name : placeholder}</span>
        <span>
          <MdOutlineArrowDropDown />
        </span>
      </button>

      <div className={openContent ? styles.content_active : styles.content}>
        <div className={styles.search}>
          {anyInput ? (
            <input
              type="text"
              placeholder="Search or Add"
              value={search}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSelectedItem({ id: "1", name: search });
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
              type="search"
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
              setOpenContent(false);
              setSearch("");
            }}
          >
            Select an item
          </li>
          {filetedData.map((item) => {
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
