import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { FaRegStickyNote } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ userInfo, handleSearch, getAllNotes }) {
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => {
    setSearchQuery("");
    getAllNotes();
  };

  const navigate = useNavigate();

  const handleIconClick = () => {
    const token = localStorage.getItem('token');
    token ? navigate('/dashboard') : navigate('/login');
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchQuery.trim() ? handleSearch(searchQuery) : getAllNotes();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <nav className="bg-gray-100 flex items-center justify-between px-6 py-3 drop-shadow-lg">
      <a onClick={handleIconClick} className="flex item-center, cursor-pointer">
        <FaRegStickyNote size={40} className="text-blue-600" />
        <div className="margin-top-2 flex items-center">
          <h1 className="text-1xl text-blue-600 font-bold ml-2">Note App</h1>
          </div>
      </a>
      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={() => handleSearch(searchQuery)} clearSearch={clearSearch} />
      <ProfileInfo userInfo={userInfo} />
    </nav>
  );
}
