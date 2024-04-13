import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import axios from "axios";

const REPORT_TYPES = {
  "Total Miles Driven": "total_miles_driven",
};

const FREQUENCY_OPTIONS = {
  daily: "DAY",
  weekly: "WEEK",
  monthly: "MONTH",
  yearly: "YEAR",
};

function App() {
  const [reportType, setReportType] = useState(
    REPORT_TYPES["Total Miles Driven"]
  );
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added state for loading

  useEffect(() => {
    fetchData();
  }, [frequency, startDate, endDate]);

  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get(
        `http://localhost:3000/?frequency=${frequency}&startDate=${startDate}&endDate=${endDate}`
      );
      // const data = await response.json();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or error
    }
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleStartDateChange = (date) => {
    // console.log(date);
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0); // Set hours to midnight in UTC time
    const formattedDate = newDate.toISOString();
    // console.log(formattedDate);
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    // console.log(date);
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0); // Set hours to midnight in UTC time
    const formattedDate = newDate.toISOString();
    // console.log(formattedDate);
    setEndDate(formattedDate);
  };

  return (
    <div className="App">
      <h1>ElectrifyIt Reports Dashboard</h1>
      <div className="filters">
        <label htmlFor="reportType">Report Type:</label>
        <select
          id="reportType"
          value={reportType}
          onChange={handleReportTypeChange}
        >
          {Object.keys(REPORT_TYPES).map((key) => (
            <option key={key} value={REPORT_TYPES[key]}>
              {key}
            </option>
          ))}
        </select>
        <label htmlFor="frequency">Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={handleFrequencyChange}
        >
          {Object.keys(FREQUENCY_OPTIONS).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <label htmlFor="startDate">Start Date:</label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={handleStartDateChange}
        />
        <label htmlFor="endDate">End Date:</label>
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : data.length > 0 ? (
        <BarChart width={800} height={400} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="miles" fill="#8884d8" />
        </BarChart>
      ) : (
        <p>No data found for selected filters.</p>
      )}
    </div>
  );
}

export default App;
