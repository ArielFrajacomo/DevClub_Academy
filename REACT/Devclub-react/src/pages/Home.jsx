import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';


export default function Home() {
  return (
    <div >
        <h1 className="text-center p-4" >Welcome to DevClub - React</h1>
        <div className='flex gap-4 justify-center items-center'>
            <Input placeholder="User Name..." id="txtName" boxSize="xl" type="text" />
            <Button size='rounded' variant='secondary'>🔎</Button>
        </div>

    </div>
  );
}