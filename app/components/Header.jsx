import NsfwSwitch from './NsfwSwitch';

const Header = () => {
  return (
    <div className='p-5 shadow'>
      <div className='max-w-4xl mx-auto flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-extrabold'>
            Talk<span className='text-[#FF2E63]'>Tonic</span>
          </h1>
        </div>
        <div>
          <NsfwSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;
