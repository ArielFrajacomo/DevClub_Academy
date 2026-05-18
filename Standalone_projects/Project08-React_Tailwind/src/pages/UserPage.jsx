import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import { useState, useEffect } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import { api, User } from '../services/api.js'
import { toast } from '../components/ui/ToastAlert.jsx'
import { cn } from '../lib/Utils.js'

export default function UserPage() {
    //get data from label ID
    const { userList, setUserList, reloadUserList, language } =
        useOutletContext()
    const [inputName, setInputName] = useState('')
    const [inputAge, setInputAge] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const hasValidId =
        typeof id === 'string' &&
        id.trim() !== '' &&
        id !== 'undefined' &&
        id !== 'null'
    const isNewUser =
        inputName.trim() !== '' &&
        /^\d+$/.test(inputAge.trim()) &&
        inputEmail.trim() !== ''

    const dict = {
        en_US: {
            searchURL: 'search',
            userListURL: 'list-of-users',

            titleDefault: 'User Details',
            titleNewUser: 'New User',
            titleEditUser: 'Edit User',
            nameLabel: 'Name',
            ageLabel: 'Age',
            emailLabel: 'e-mail',
            buttonSearch: 'Search',
            buttonSave: 'Save',
            buttonClear: 'Clear',

            successSave: 'User saved successfully.',
            successCreate: 'User created successfully.',
            userNotFound: 'User not found.',
            userMultipleFound: 'Multiple users found, redirected to user list.',
            error: 'Error occurred while processing the user.',

            easterEgg: (
                <span>
                    No one can change the Creator, <br /> not even me, the
                    Creator
                </span>
            ),
        },
        pt_BR: {
            searchURL: 'buscar',
            userListURL: 'lista-de-usuarios',

            titleDefault: 'Detalhes do Usuário',
            titleNewUser: 'Novo Usuário',
            titleEditUser: 'Editar Usuário',
            nameLabel: 'Nome',
            ageLabel: 'Idade',
            emailLabel: 'e-mail',
            buttonSearch: 'Buscar',
            buttonSave: 'Salvar',
            buttonClear: 'Limpar',

            successSave: 'Usuário salvo com sucesso.',
            successCreate: 'Usuário criado com sucesso.',
            userNotFound: 'Usuário não encontrado.',
            userMultipleFound:
                'Múltiplos usuários encontrados, redirecionado para a lista de usuários.',
            error: 'Ocorreu um erro ao processar o usuário.',

            easterEgg: (
                <span>
                    Ninguém pode alterar o Criador, <br /> nem mesmo eu, o
                    Criador.
                </span>
            ),
        },
    }

    useEffect(() => {
        if (!hasValidId) return

        if (userList.length === 0) {
            reloadUserList()
            return
        }

        searchUserList()
    }, [id, userList.length])

    function btnSearch() {
        if (hasValidId) {
            searchUserList()
        } else {
            // search by name, age and email, but only if the fields are not empty, otherwise show an error toast
            const usersFound = userList.filter((user) => {
                const matchesName =
                    inputName.trim() === '' ||
                    user.name
                        .toLowerCase()
                        .includes(inputName.trim().toLowerCase())
                const matchesAge =
                    inputAge.trim() === '' ||
                    user.age === parseInt(inputAge.trim())
                const matchesEmail =
                    inputEmail.trim() === '' ||
                    user.email
                        .toLowerCase()
                        .includes(inputEmail.trim().toLowerCase())
                return matchesName && matchesAge && matchesEmail
            })

            if (usersFound.length === 1) {
                const user = usersFound[0]

                setInputName(user.name)
                setInputAge(user.age.toString())
                setInputEmail(user.email)
                //set params to URL busca/:id search/:id
                const nextPath = `/${dict[language].searchURL}/${user.id}`
                if (window.location.pathname !== nextPath) {
                    navigate(nextPath, { replace: true })
                }
            } else {
                if (usersFound.length > 1) {
                    // if multiple users found, filter the userList and redirect
                    setUserList(usersFound)
                    toast.warning(dict[language].userMultipleFound)
                    navigate(`/${dict[language].userListURL}`)
                } else {
                    toast.error(dict[language].userNotFound)
                }
            }
        }
    }

    function searchUserList() {
        const user = new User()

        const foundUser = userList.find((u) => u.id === id)

        if (foundUser) {
            user.getFromJson(foundUser)

            setInputName(user.name)
            setInputAge(user.age.toString())
            setInputEmail(user.email)
        } else {
            toast.error(dict[language].userNotFound)
        }
    }

    function saveUser() {
        // Save (or Create) user, if ID is empty, it will create a new user.
        if (hasValidId) {
            const user = new User(
                id,
                inputEmail,
                inputName,
                parseInt(inputAge, 10),
            )

            api.updateUser(user.toJson())
                .then(() => {
                    toast.success(dict[language].successSave)
                    reloadUserList()
                })
                .catch((error) => {
                    console.error('Error updating user:', error)
                    toast.error(dict[language].error)
                })
        } else {
            const user = new User(
                '',
                inputEmail,
                inputName,
                parseInt(inputAge, 10),
            )
            api.addUser(user.toJson())
                .then(async (resp) => {
                    toast.success(dict[language].successCreate)
                    const newUserID = resp?.data?.id

                    if (newUserID) {
                        await reloadUserList()
                        navigate(`/${dict[language].searchURL}/${newUserID}`)
                    } else {
                        toast.error(dict[language].error)
                    }
                })
                .catch((error) => {
                    console.error('Error creating user:', error)
                    toast.error(dict[language].error)
                })
        }
    }

    function clearInputFields() {
        setInputName('')
        setInputAge('')
        setInputEmail('')
        // Clear URL params
        const basePath = `/${dict[language].searchURL}`
        if (window.location.pathname !== basePath) {
            navigate(basePath, { replace: true })
        }
    }

    function handleAgeChange(event) {
        const sanitizedValue = event.target.value.replace(/\D/g, '')
        if (sanitizedValue !== inputAge) {
            setInputAge(sanitizedValue)
        }
    }

    function saveOrSearch() {
        if (hasValidId || isNewUser) {
            if (id === '69ef545dd6c918256c47c58d') {
                toast.warning(dict[language].easterEgg)
                return
            }

            saveUser()
        } else {
            btnSearch()
        }
    }

    return (
        // react needs a parent wrapping everything
        <div className="w-full mx-auto flex flex-col items-center pt-32 sm:pt-16">
            <h1 className="text-center p-4 mb-8 text-3xl font-bold text-gray-900 text-shadow-lg text-shadow-black/20 dark:text-gray-50">
                {hasValidId
                    ? dict[language].titleEditUser
                    : isNewUser
                      ? dict[language].titleNewUser
                      : dict[language].titleDefault}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-9/10 max-w-md">
                <Input
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder={dict[language].nameLabel}
                    id="txtName"
                    boxSize="full"
                    type="text"
                />
                <Input
                    value={inputAge}
                    onChange={handleAgeChange}
                    placeholder={dict[language].ageLabel}
                    id="txtAge"
                    boxSize="full"
                    type="text"
                    inputMode="numeric"
                />
                <Input
                    classContainer="sm:col-span-2"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder={dict[language].emailLabel}
                    id="txtEmail"
                    boxSize="full"
                    type="email"
                />
            </div>
            <div className="flex justify-between p-4 gap-4">
                <Button size="lg" type="button" onClick={saveOrSearch}>
                    {hasValidId || isNewUser
                        ? dict[language].buttonSave
                        : dict[language].buttonSearch}
                </Button>
                {hasValidId && (
                    <Button size="sm" type="button" onClick={clearInputFields}>
                        {dict[language].buttonClear}
                    </Button>
                )}
            </div>
        </div>
    )
}
