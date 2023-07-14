import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

type ResponseData = {
  source: string;
  page_content: string;
  relevance: number;
};

type ErrorData = {
  error: string;
};

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch the query from URL on component mount
  useEffect(() => {
    if (router.query.search) {
      setQuery(router.query.search as string);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query !== "") {
        try {
          const result = await axios.post("http://localhost:4242/query", {
            query: query,
            top: 3,
          });

          setResponses(result.data);
          setError("");
        } catch (error) {
          setError("Error fetching results. Please try again later.");
          setResponses([]);
        }
      } else {
        setResponses([]);
      }
    };

    fetchResults();
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    router.push(`/?search=${encodeURIComponent(e.target.value)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <main className="flex flex-col items-center h-screen p-4 bg-gray-100">
      <div className="mb-4 w-full max-w-4xl">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full p-4 text-xl border rounded-md outline-none transition duration-150 ease-in-out"
          id="search-input"
          placeholder="Search..."
        />
      </div>
      {error && (
        <div className="w-full max-w-4xl mx-auto mb-4 bg-red-500 text-white rounded-md p-4">
          {error}
        </div>
      )}
      {responses.map((response, index) => (
        <div
          key={index}
          className="w-full max-w-4xl mx-auto mb-4 bg-white rounded-xl p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl text-gray-800 font-bold">
              {response.source}
            </h2>
            <span className="text-lg text-blue-500">
              {response.relevance.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-700">{response.page_content}</p>
        </div>
      ))}
    </main>
  );
}
