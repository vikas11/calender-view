
import './App.css';
import CalendarComponent from "./components/calendar/calendar";

function App() {
  const myStyle = {
    backgroundImage: `url(${window.location.origin + "/assets/images/bg.png"})`,
    height: '99.8vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    padding: '20px'
  };

  return (
    <div style={myStyle} className="row">
    <div className="col-md-6">
      <CalendarComponent isViewTypeMonth={false}></CalendarComponent>
    </div>
    {/* <div className="col-md-7">
      <CalendarComponent isViewTypeMonth={true}></CalendarComponent>
    </div> */}
  </div>
  );
}

export default App;
