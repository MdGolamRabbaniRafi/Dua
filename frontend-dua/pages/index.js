import axios from "axios";
import { useEffect, useState } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer"; 


export default function Home() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [duas, setDuas] = useState({});
  const [duasBySub, setDuasBySub] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [duaDropdownVisible, setDuaDropdownVisible] = useState({});
  const [selectedDuaDetails, setSelectedDuaDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchAllData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_dua+"findAllCategory", {
        withCredentials: true,
      });
      console.log(response);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setCategories(response.data);
        fetchSubCategories(response.data[0].cat_id);
      }
    } catch (error) {
      console.error("Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_dua+"findAllDua", {
        withCredentials: true,
      });
      setSelectedDuaDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch dua details:", error);
    }
  };

  const fetchSubCategories = async (catId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_dua+`findAllSubCatbyCat/${catId}`, {
        withCredentials: true,
      });
      const response2 = await axios.get(process.env.NEXT_PUBLIC_dua+`findAllDuabyCat/${catId}`, {
        withCredentials: true,
      });
      setSubCategories((prev) => ({ ...prev, [catId]: response.data }));
      setDuasBySub(response2.data);
      toggleDropdown(catId);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDuas = async (subCatId) => {
    setIsLoading(true); 
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_dua+`findAllDuabySubCat/${subCatId}`, {
        withCredentials: true,
      });
      setDuas((prev) => ({ ...prev, [subCatId]: response.data }));
      toggleDuaDropdown(subCatId); 
      scrollToSubCategorySection(subCatId); 
    } catch (error) {
      console.error("Failed to fetch duas:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const scrollToSubCategorySection = (subCatId) => {
    const sectionElement = document.getElementById(`section_${subCatId}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleDropdown = (catId) => {
    const updatedDropdownVisible = Object.fromEntries(
      Object.keys(dropdownVisible).map((key) => [key, false])
    );
    updatedDropdownVisible[catId] = !dropdownVisible[catId];

    setDropdownVisible(updatedDropdownVisible);
    setDuaDropdownVisible({}); // Collapse all dua dropdowns when toggling a category
  };

  const toggleDuaDropdown = (subCatId) => {
    const updatedDuaDropdownVisible = Object.fromEntries(
      Object.keys(duaDropdownVisible).map((key) => [key, false])
    );
    updatedDuaDropdownVisible[subCatId] = !duaDropdownVisible[subCatId];

    setDuaDropdownVisible(updatedDuaDropdownVisible);
  };

  const handleDuaClick = (duaId) => {
    const duaElement = document.getElementById(duaId.toString());
    if (duaElement) {
      duaElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.cat_name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubCatName = (subcatId) => {
    for (const catId of Object.keys(subCategories)) {
      const foundSubCat = subCategories[catId].find((subCat) => subCat.id === subcatId);
      if (foundSubCat) return foundSubCat.subcat_name_en;
    }
    return ""; // Default value if not found
  };

  return (
    <div className="max-w-9/12 mx-auto py-8 pr-16 pl-16 bg-[#EBEEF2] flex gap-4">
      <div className="bg-[#FFFFFF] w-1/3 h-screen rounded-md shadow-md">
        <div className="w-full h-14 rounded-sm bg-[#1FA45B] text-black items-center justify-center rounded-t-md">
          <h1 className="text-xl text-center text-white">Categories</h1>
          <input
            type="text"
            className="p-3 border rounded mt-10 w-11/12 ml-4"
            placeholder="Search categories..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full mt-20 overflow-auto" style={{ height: "calc(100vh - 110px)" }}>
          <ul className="space-y-4">
            {filteredCategories.map((category) => (
              <li key={category.id} className="bg-white rounded-lg overflow-hidden ml-3 mr-3 text-left">
                <div id={`category_${category.cat_id}`} className="p-2">
                  <button
                    className="w-full p-3 bg-white text-gray-700 rounded hover:bg-[#EBEEF2] transition duration-300 text-lg font-semibold"
                    onClick={() => {
                      fetchSubCategories(category.cat_id);
                      toggleDropdown(category.cat_id); 
                    }}
                  >
                    {category.cat_name_en}
                  </button>
                  {isLoading && <div className="text-center py-2">Loading...</div>}
                  {dropdownVisible[category.cat_id] && (
                    <div className="mt-2">
                      {subCategories[category.cat_id] &&
                        subCategories[category.cat_id].map((subCat) => (
                          <div key={subCat.id} className="pt-2">
                            <p
                              className="inline-flex items-center justify-center py-2 px-4 text-gray-600 rounded transition duration-300 cursor-pointer"
                              onClick={() => fetchDuas(subCat.id)}
                            >
                              {subCat.subcat_name_en}
                            </p>
                            {duaDropdownVisible[subCat.id] && (
                              <div className="mt-2 p-2 bg-white shadow rounded">
                                {duas[subCat.id] &&
                                  duas[subCat.id].map((dua) => (
                                    <p
                                      key={dua.id}
                                      className="text-gray-800 hover:text-gray-600 transition duration-150 cursor-pointer pl-8"
                                      onClick={() => handleDuaClick(dua.id)}
                                    >
                                      {dua.dua_name_en}
                                    </p>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col h-screen w-2/3 gap-3 overflow-auto">
        {duasBySub.map((selectedDuaDetail, index) => (
          <div key={selectedDuaDetail.id} className="">
            {index === 0 || duasBySub[index - 1].subcat_id !== selectedDuaDetail.subcat_id ? (
              <div id={`section_${selectedDuaDetail.subcat_id.toString()}`} className="w-full h-14 rounded-md bg-[#FFFFFF] mb-4 flex items-center pl-4">
                <span className="text-green-500">Section:</span> {getSubCatName(selectedDuaDetail.subcat_id)}
              </div>
            ) : null}
            <div className="flex-1 bg-white max-h-fit rounded-md" id={selectedDuaDetail.id.toString()}>
              <div className="p-8 gap-3 text-xl">
                <p  className="text-green-500">{selectedDuaDetail.id}. {selectedDuaDetail.dua_name_en}</p>
                <br></br>
                <p> {selectedDuaDetail.top_en}</p>
                <br></br>

                {selectedDuaDetail.dua_arabic !== null && (
               <><p> {selectedDuaDetail.dua_arabic}</p><br></br></>

                )}
                {selectedDuaDetail.transliteration_en !== null && (
               <><p>Transliteration: {selectedDuaDetail.transliteration_en}</p><br></br></>

                )}
                                
                {selectedDuaDetail.transliteration_en !== null && (
               <><p>Transliteration: {selectedDuaDetail.transliteration_en}</p><br></br></>

                )}

                {selectedDuaDetail.bottom_en !== null && (
               <><p>{selectedDuaDetail.bottom_en}</p><br></br></>

                )}
                <p className="text-green-500">Reference:</p><p>{selectedDuaDetail.refference_en}</p>
                {/* <p>Audio:</p> */}
                <br></br>
                {selectedDuaDetail.audio && (
                 <><CustomAudioPlayer audioSrc={selectedDuaDetail.audio} /><br></br></>

                )}
{/* 
                <audio controls>
                  
                  <source src={selectedDuaDetail.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 