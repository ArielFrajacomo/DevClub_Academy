import { useRef } from 'react';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';



export default function Home() {
    const inputName = useRef(null);

    function search() {
        console.log(inputName.current?.value);
    }

  return (
    <div >
        <h1 className="text-center p-4" >Welcome to DevClub - React</h1>
        <div className='flex gap-4 justify-center items-center'>
            <Input ref={inputName} placeholder="User Name..." id="txtName" boxSize="xl" type="text" />
            {/* type Button doesn't make the page reload, submit does */}
            <Button type="button" size='rounded' variant='secondary' onClick={search}>🔎</Button>
        </div>
    </div>
  );
}