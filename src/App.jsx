import ReactDOM from 'react-dom';
import AppLayout from './pages/AppLayout.jsx';

const App = () => {
  return (
    <div className='container'>
      <AppLayout />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
