import { useRef } from 'react'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { cn } from '../lib/Utils.js'

export default function Home() {
    const navigate = useNavigate()
    const { language } = useOutletContext()

    const dict = {
        Search: {
            Label: { pt_BR: 'Pesquisar um usuário', en_US: 'Search User' },
            link: { pt_BR: '/buscar', en_US: '/search' },
        },
        Userlist: {
            Label: { pt_BR: 'Lista de usuários', en_US: 'User List' },
            link: { pt_BR: 'lista-de-usuarios', en_US: 'list-of-users' },
        },
    }
    const btnClass = {
        div: cn(
            'p-4 aspect-square font-semibold shadow-md shadow-black/50',
            'text-black border border-gray-600',
            'dark:text-white dark:border-gray-200',
        ),
        onHover: 'hover:bg-blue-500/20 dark:hover:bg-blue-500/5',
    }

    function buttonToSearchPage() {
        navigate(`/${dict.Search.link[language]}`)
    }
    function buttonToUserListPage() {
        navigate(`/${dict.Userlist.link[language]}`)
    }

    return (
        <div>
            <h1 className="text-center p-4">Welcome to DevClub - React</h1>
            <div className="mx-auto flex h-[clamp(12rem,32vw,18rem)] w-full max-w-3xl p-5 gap-4 justify-center items-stretch">
                <Button
                    onClick={buttonToSearchPage}
                    variant="transparent"
                    size="free"
                    className={btnClass.div}
                    onHover={btnClass.onHover}
                >
                    {dict.Search.Label[language]}
                </Button>
                <Button
                    onClick={buttonToUserListPage}
                    variant="transparent"
                    size="free"
                    className={btnClass.div}
                    onHover={btnClass.onHover}
                >
                    {dict.Userlist.Label[language]}
                </Button>
            </div>
        </div>
    )
}
