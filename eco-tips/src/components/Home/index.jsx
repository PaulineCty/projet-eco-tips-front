import ArticleList from '@/components/Home/Articles';
import HomeAchievement from '@/components/Home/HomeAchievement';
import LatestCard from '@/components/Community/LatestCard';

function Home() {
  return (
    <div>
      <h1 className='text-center mb-6 mx-6 inset-text-shadow'>Avec Eco-tips, contribuez aux causes qui vous sont chères tout en vous amusant. Participez au <strong>mouvement écologique</strong> et faites des <strong>économies</strong> !</h1>
      <div className="flex flex-wrap gap-10 mx-auto w-[90%] place-content-center">
        <LatestCard />
        <HomeAchievement />
      </div>
    </div>
  );
}

export default Home;
