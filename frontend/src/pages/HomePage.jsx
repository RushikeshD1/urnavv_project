import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import Plants from "../components/Plants";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";

const HomePage = () => {
  const [isActive, setIsActive] = useState(false);
  const [plants, setPlants] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [qty, setQty] = useState();
  const [categories, setCategory] = useState("");
  const [isCategory, setIsCategory] = useState("All Categories");
  const [error, setError] = useState("");
  const [isPlantAdd, setIsPlantAdd] = useState(false);
  const [isAvailable, setIsAvailable] = useState("");
  const [search, setSearch] = useState("");

  const fetchPlants = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get("http://localhost:3000/api/v1/plant/fetch");

      setPlants(res.data.plants);
    } catch (error) {
      // console.log("something went wrong", error);
      setError("Failed to load plants. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handlePlants = async () => {
    setIsActive(false);
    setIsPlantAdd(!isPlantAdd);
  };

  const handleAddPlant = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/plant/create",
        {
          name,
          price,
          qty,
          categories,
        }
      );

      await fetchPlants();
    } catch (error) {
      // console.log("something went wrong", error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setIsPlantAdd(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  const filterPlants = plants.filter((plant) => {
    const q = (search || "").trim().toLowerCase();
    const selCat = (isCategory || "").trim().toLowerCase();

    const nameLower = (plant.name || "").toLowerCase();
    const catLower = (plant.categories || "").toLowerCase();

    const matchSearch =
      q === "" || nameLower.includes(q) || catLower.includes(q);

    const matchCategory =
      selCat === "" || selCat === "all categories" || catLower === selCat;

    const plantQty = Number(plant.qty) || 0;
    const matchAvailability =
      isAvailable === ""
        ? true
        : isAvailable === "yes"
        ? plantQty > 0
        : isAvailable === "no"
        ? plantQty === 0
        : true;

    return matchSearch && matchCategory && matchAvailability;
  });

  const handleClearFilter = () => {
    setSearch("");
    setIsCategory("All Categories");
    setIsAvailable("");
    setIsActive(false)
  };

  const renderPlants = filterPlants.length === 0 ? <div className="text-green-700">No Plant Found</div>: filterPlants.map((plant) => (
    <Plants key={plant._id} plant={plant} />
  ));

  return (
    <div className="p-10 flex flex-col gap-4">
      {/* Search functionality */}
      <div className="max-h-screen border border-green-300 rounded-md flex flex-row">
        <span className="flex justify-center items-center">
          <IoMdSearch className="text-green-600 text-lg ml-2" />
        </span>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search plants by name, description, or category..."
          className="w-full px-4 py-2 text-sm outline-none font-semibold -ml-1"
        />
      </div>

      <div className="flex flex-row gap-2">
        {/* FilterFunctionality */}
        <div
          onClick={() => {
            setIsActive(!isActive);
            setIsPlantAdd(false);
          }}
          className="flex flex-row gap-2 items-center justify-center rounded-md bg-white border border-green-300 h-8 w-20 text-green-800 font-semibold cursor-pointer hover:bg-transparent"
        >
          <CiFilter />
          <span>Filters</span>
        </div>

        {/* Add Plants */}
        <div
          onClick={handlePlants}
          className="flex flex-row gap-2 items-center justify-center rounded-md bg-white border border-green-300 h-8 px-2  text-green-800 font-semibold cursor-pointer hover:bg-transparent"
        >
          <span>Add Plant</span>
          <IoIosAddCircleOutline />
        </div>
      </div>

      {isActive ? (
        <div className="flex md:flex-row flex-col bg-white gap-10 border border-green-300 rounded-md p-5">
          <div className="flex flex-col">
            <span className="text-green-700 font-semibold">Category</span>
            <select
              onChange={(e) => setIsCategory(e.target.value)}
              value={isCategory}
              className="border border-green-300 rounded-md text-sm p-2 outline-none"
            >
              <option value="All Categories">All Categories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Succulent">Succulent</option>
              <option value="Medicinal">Medicinal</option>
              <option value="Flowering">Flowering</option>
            </select>
          </div>
          <div>
            <span className="text-green-700 font-semibold">
              Availability(Based on quantity)
            </span>
            <div>
              <label className="flex items-center gap-2">
                <input
                  onChange={(e) => setIsAvailable(e.target.value)}
                  type="radio"
                  name="availability"
                  value="yes"
                  className="accent-green-700"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  onChange={(e) => setIsAvailable(e.target.value)}
                  type="radio"
                  name="availability"
                  value="no"
                  className="accent-green-700"
                />
                No
              </label>
            </div>
          </div>
          <span
            onClick={handleClearFilter}
            className="inline-block h-fit w-fit hover:underline hover:text-blue-600 font-semibold text-green-700 cursor-pointer"
          >
            Clear filter
          </span>
        </div>
      ) : (
        <div className="hidden"></div>
      )}

      {isPlantAdd ? (
        <div className="flex flex-col bg-white gap-5 border border-green-300 rounded-md p-5">
          <h1 className="text-green-700 text-xl font-bold">Add Your Plants</h1>
          <div className="flex flex-col">
            <label className="text-green-700 font-semibold">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-green-300 rounded-md text-sm p-2 outline-none first-letter:uppercase"
              type="text"
              placeholder="Enter plant name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-green-700 font-semibold">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="border border-green-300 rounded-md text-sm p-2 outline-none"
              type="number"
              placeholder="Enter price"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-green-700 font-semibold">Quantity</label>
            <input
              onChange={(e) => setQty(e.target.value)}
              value={qty}
              className="border border-green-300 rounded-md text-sm p-2 outline-none"
              type="number"
              placeholder="Enter Quantity"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-green-700 font-semibold">
              Select plant category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={categories}
              className="border border-green-300 rounded-md text-sm p-2 outline-none"
            >
              <option value="All Categories">Select categories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Succulent">Succulent</option>
              <option value="Medicinal">Medicinal</option>
              <option value="Flowering">Flowering</option>
            </select>
          </div>

          <div
            onClick={handleAddPlant}
            className="px-2 flex justify-center items-center align-middle w-20 rounded-md bg-green-300 border border-b-green-600 h-8 text-green-800 font-semibold cursor-pointer hover:bg-green-200"
          >
            Add
          </div>
        </div>
      ) : (
        <div className="hidden"></div>
      )}

      {error && <div className="text-red-600">{error}</div>}

      {isloading ? <div>Plants Loading...</div> :
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {renderPlants}
        </div>
      }
    </div>
  );
};

export default HomePage;
