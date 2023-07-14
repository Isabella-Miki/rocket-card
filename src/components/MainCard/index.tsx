import { UsersIcon, BookOpenIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import axios from 'axios'
import IUser from '../../interfaces/User'

export default function MainCard() {
  const [userName, setUserName] = useState('neofrosch')
  const [userData, setUserData] = useState<IUser>([])
  const [currentColor, setCurrentColor] = useState('#0E1218')

  const colors = [
    '#6E56CF',
    '#E54D2E',
    '#E93D82',
    '#46A758',
    '#3E63DD',
    '#0090FF',
    '#68DDFD',
    '#05A2C2',
    '#F76808',
    '#F5D90A',
    '#99D52A',

  ]

  const submitName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.get(`https://api.github.com/users/${userName}`)
      .then(res => {
        setUserData(res.data)
        setUserName('')

      })
  }

  useEffect(() => {
    axios.get(`https://api.github.com/users/neofrosch`)
      .then(res => {
        setUserData(res.data)
        setUserName('')
      })

  }, [])

  const changeColor = () => {
    console.log(currentColor)
    const randomNum = Math.floor(Math.random() * colors.length)
    setCurrentColor(colors[randomNum])
  }

  return (
    <section className='bg-black h-100 w-100 text-white flex flex-col gap-5 sm:flex-row sm:justify-center sm:items-center sm:gap-20'>

      <div className='flex flex-col bg-neutral-900 p-4 rounded-2xl'>

        <div className='p-3 rounded-3xl overflow-hidden flex flex-col' style={{ backgroundColor: `${currentColor}` }}>
          <div className='flex gap-4 items-center my-5'>
            <img className='h-14 w-14 rounded-full' src={userData.avatar_url} alt="" />
            <p className='text-center'>{userData.name !== null ? userData.name : userData.login} ({userData.login})</p>
          </div>

          <img className='rounded-full border-8 border-purple-600 border-double relative top-2 left-24 h-80 w-80' src={userData.avatar_url} alt="" />

          <div className='bg-stone-800 bg-opacity-80 w-fit relative -top-20 p-4 rounded-xl h-fit'>
            <p className='flex'><UsersIcon className='h-6' /> {userData.followers} Seguidores</p>
            <p className='flex'><UsersIcon className='h-6' /> {userData.following} Seguindo</p>
            <p className='flex'><BookOpenIcon className='h-6' /> {userData.public_repos} Repositórios</p>
            {userData.company && <p className='flex'><BuildingOffice2Icon className='h-6' /> {userData.company}</p>}
            {userData.location && <p className='flex'><MapPinIcon className='h-6' /> {userData.location}</p>}
          </div>
          <p className='text-end font-bold text-2xl'>#RocketCard</p>
        </div>

      </div>

      <div className="flex flex-col gap-5 ">
        <form className='flex items-center justify-center' onSubmit={submitName}>
          <input className='outline-none py-2 px-4 rounded-l-xl text-black border-2 focus:border-purple-800 border-r-0 ' type="text" name="" id="" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Digite o perfil do github' />
          <button className='outline-none py-2 px-4 rounded-r-xl bg-purple-800 border-2  border-purple-800 hover:bg-opacity-0 ease-out duration-300 border-l-0' type="submit" >Gerar Card</button>
        </form>
        <button className='outline-none py-2 px-4 rounded-xl bg-purple-800 text-center border-2 border-purple-800 hover:bg-opacity-0 ease-out duration-300' onClick={changeColor}>Gerar Background</button>
      </div>
    </section>

  )
}
