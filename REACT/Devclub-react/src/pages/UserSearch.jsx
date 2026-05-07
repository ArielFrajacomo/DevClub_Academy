import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';


export default function UserSearch () {
  return (
  // react needs a parent wrapping everything
  <div className="h-full w-5xl mx-auto flex flex-col items-center justify-center"> 
    <h1 className="text-center p-4" >Registered Users</h1>
    <div className='w-l'>
      <div className="flex gap-4 mb-4">
        <Input placeholder="Name" id="txtName" boxSize="full" type="text" />
        <Input placeholder="Age" id="txtAge" boxSize="full" type="number" />
      </div>
        <Input placeholder="Email" id="txtEmail" boxSize="full" type="email" />
    </div>
    <div className='flex justify-between p-4 gap-4'>
      <Button size='lg'>Search</Button>
    </div>
  </div>
)
}