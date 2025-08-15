import { memo, useState, type FormEvent } from "react";
import { useCars } from "../../api/hook/cars";

const Car = () => {
  const { getCars, deleteCar, updateCar, createCar } = useCars();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [power, setPower] = useState("");

  const [editingItem, setEditingItem] = useState<any>(null);

  const { data } = getCars();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let car = {
      name,
      price: Number(price),
      brand,
      color,
      release_date,
      power: Number(power),
    };
    console.log(car);

    if (editingItem) {
      updateCar.mutate(
        { id: editingItem.id, data: car },
        {
          onSuccess: () => {
            setName("");
            setPrice("");
            setBrand("");
            setColor("");
            setRelease_date("");
            setPower("");
          },
        }
      );
    } else {
      createCar.mutate(car, {
        onSuccess: () => {
          setName("");
          setPrice("");
          setBrand("");
          setColor("");
          setRelease_date("");
          setPower("");
        },
      });
    }
  };

  const handleUpdate = (item: any) => {
    setName(item.name);
    setBrand(item.brand);
    setColor(item.color);
    setPrice(item.price);
    setRelease_date(item.release_date);
    setPower(item.power);
    setEditingItem(item);
    
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2  outline-none"
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border rounded-lg px-4 py-2  outline-none"
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
          <input
            type="date"
            value={release_date}
            onChange={(e) => setRelease_date(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
          <input
            type="number"
            placeholder="Power"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none"
          />
          <button
            type="submit"
            disabled={createCar.isPending}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              createCar.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {createCar.isPending ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>

      <div className=" mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
        {data?.map((car: any) => (
          <div
            key={car.id}
            className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-1">Name: {car.name}</h3>
            <h6 className="text-gray-500">Brand: {car.brand}</h6>
            <h6 className="text-gray-600">Color: {car.color}</h6>
            <h6 className="text-green-600 font-bold"> Price: 💲{car.price}</h6>
            <h6 className="text-sm text-gray-500">
              Release: {car.release_date}
            </h6>
            <h6 className="text-sm">Power: {car.power} HP</h6>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => deleteCar.mutate(car.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(car)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Car);
