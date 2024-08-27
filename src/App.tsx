import FiveDayForecast from "./components/five-day-forecast";
import Header from "./components/header";
import Weather from "./components/weather";

function App() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% max-w-2xl mx-auto p-10">
      <Header />
      <section className="flex flex-col gap-5 items-center text-center">
        <Weather />
        <div className="flex flex-col gap-5 text-gray-50 font-bold">
          <h2>Five Days Forecast</h2>
          <hr className="h-1 w-full" />
          <FiveDayForecast />
        </div>
      </section>
    </main>
  );
}

export default App;
