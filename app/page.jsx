import Subreddits from './components/Subreddits';
import Types from './components/Types';

const HomePage = () => {
  return (
    <div className='grid grid-cols-3 gap-4 max-w-7xl mx-auto mt-7'>
      <div className='col-span-2'>
        <Types />
      </div>
      <Subreddits className='col-span-1' />
    </div>
  );
};

export default HomePage;
