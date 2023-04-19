import { monoTon, tourney } from '../utils/fonts';

const Header = () => {
  return (
    <div className='p-5 shadow'>
      <div className='max-w-4xl mx-auto flex justify-between items-center'>
        <div className={tourney.className}>
          <h1 className='text-2xl font-extrabold'>
            Talk<span className='text-[#FF2E63]'>Tonic</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
