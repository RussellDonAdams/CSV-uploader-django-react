import React, { useEffect, useState } from "react";

export default function PeopleList() {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/people/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ People from API:", data); // Debug log
        setPeople(data.results || []);
        setHasNext(data.has_next);
        setHasPrevious(data.has_previous);
      })
      .catch((err) => console.error("❌ Failed to fetch people:", err));
  }, [page]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">People List</h2>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">First Name</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Last Name</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Email</th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Age</th>
          </tr>
        </thead>
        <tbody>
          {people.length > 0 ? (
            people.map((person, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-1">
                  <p variant="small" color="blue-gray" className="font-normal">{person.first_name}</p>
                </td>
                <td className="border px-3 py-1">
                  <p variant="small" color="blue-gray" className="font-normal">{person.last_name}</p>
                </td>
                <td className="border px-3 py-1">
                  <p variant="small" color="blue-gray" className="font-normal">{person.email}</p>
                </td>
                <td className="border px-3 py-1">
                <p variant="small" color="blue-gray" className="font-normal">{person.age}</p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          disabled={!hasPrevious}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={!hasNext}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
