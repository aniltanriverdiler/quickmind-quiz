import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='text-center space-y-6'>
     <h1 className='text-3xl font-bold'>React Quiz Uygulaması</h1>
     <p>Bilgini test etmeye hazır mısın ?</p>
     <Button className='px-6 py-3 text-lg' onClick={() => navigate("/quiz")}>
        Quiz'e Başla
     </Button>
    </div>
  )
}

export default Home